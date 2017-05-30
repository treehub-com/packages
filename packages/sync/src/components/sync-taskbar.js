import {query, mutation} from '@thp/lib/graphql.js';

class Component extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', () => {
      window.app.page = '/sync/';
    });
  }

  connectedCallback() {
    this.innerHTML = 'SYNC';
    this._initializeSync();
  }

  async _initializeSync() {
    const spaces = await query({
      url: '/sync/',
      query: 'spaces {id url authorization}',
    });

    for (const space of spaces) {
      this._syncSpace(space.id, space.url)
        .catch((error) => console.error(error));
    }
  }

  async _syncSpace(id, url) {
    const localSpace = await query({
      url: `/api/${id}`,
      query: `status {cid}`,
    });
    const remoteSpace = await query({
      url,
      query: `status {cid}`,
    });

    let localCID = localSpace.cid;
    let remoteCID = remoteSpace.cid;

    if (localCID > remoteCID) {
      // TODO handle this case with a full sync?
      console.log(`Aborting Sync: local cid(${localCID}) > remote cid(${remoteCID})`);
      return;
    }

    let syncdDown = false;
    while (!syncdDown) {
      console.log('space: syncing down');
      if (localCID === remoteCID) {
        syncdDown = true;
        continue;
      }

      const {cid, changes} = await query({
        url,
        query: `changes(cid: ${localCID})`,
      });

      localCID = await mutation({
        url,
        query: `apply(cid: ${cid} changes: $input)`,
        type: 'JSON!',
        input: changes,
      });
    }

    let syncdUp = false;
    while (!syncdUp) {
      console.log('space: syncing up');
      const changes = await query({
        url: `/api/${id}`,
        query: 'dirty(limit: 100)',
      });
      if (changes.length === 0) {
        syncdUp = true;
        continue;
      }
      const keys = [];
      for (const change of changes) {
        keys.push(change[0]);
      }

      remoteCID = await mutation({
        url,
        query: `change(cid: ${localCID} changes: $input)`,
        type: 'JSON!',
        input: changes,
      });

      localCID = await mutation({
        url: `/api/${id}`,
        query: `clean(cid: ${remoteCID} keys: $input)`,
        type: 'JSON!',
        input: keys,
      });
    }

    // Update last sync time locally
    await mutation({
      url: '/sync/',
      query: `setStatus(input: $input)`,
      type: 'SetStatusInput!',
      input: {id, lastSync: (Date.now() / 1000 | 0)},
    });

    console.log(`space sync complete ${localCID} ${remoteCID}`);

    const localTrees = await query({
      url: `/api/${id}`,
      query: `status {cid trees {id lastCommit}}`,
    });
    const remoteTrees = await query({
      url,
      query: `status {cid trees {id lastCommit}}`,
    });
    const syncTrees = await query({
      url: '/sync/',
      query: `status(space: "${id}") {trees {id commit}}`,
    });
    // TODO ensure we are still on the same cid

    const trees = {};
    for (const tree of localTrees.trees) {
      trees[tree.id] = {
        url: `${url}/${tree.id}`,
        space: id,
        tree: tree.id,
        local: tree.lastCommit,
      };
    }
    for (const tree of remoteTrees.trees) {
      trees[tree.id].remote = tree.lastCommit;
    }
    for (const tree of syncTrees.trees) {
      trees[tree.id].sync = tree.commit;
    }

    const promises = [];
    for (const tree of Object.keys(trees)) {
      promises.push(this._syncTree(trees[tree]));
    }

    await Promise.all(promises);

    console.log('tree sync complete');
  }

  async _syncTree({url, space, tree, local, remote, sync}) {
    console.log(`syncing ${space}/${tree}`);

    const undoneCommits = [];

    let syncdDown = false;
    while(!syncdDown) {
      console.log('tree: syncing down');
      const remoteCommits = await query({
        url,
        query: 'commits(after: $input limit: 10)',
        type: 'String',
        input: sync,
      });

      if (remoteCommits.length === 0) {
        syncdDown = true;
        continue;
      }

      if (sync !== local) {
        // TODO undo & set local
        console.log(`Cannot sync tree ${space}/${tree}`);
        return;
      }

      for (const commit of remoteCommits) {
        await mutation({
          url: `/api/${space}/${tree}`,
          query: 'patch(input: $input) { id }',
          type: 'PatchInput!',
          input: commit,
        });
        sync = commit.id;
      }
    }

    if (undoneCommits.length > 0) {
      // TODO merge and patch locally
    }

    let syncdUp = false;
    while(!syncdUp) {
      console.log('tree: syncing up');
      const localCommits = await query({
        url: `/api/${space}/${tree}`,
        query: 'commits(after: $input limit: 10)',
        type: 'String',
        input: sync,
      });

      if (localCommits.length === 0) {
        syncdUp = true;
        continue;
      }

      for (const commit of localCommits) {
        await mutation({
          url,
          query: 'patch(input: $input)',
          type: 'PatchInput!',
          input: {commit},
        });
        sync = commit.id;
      }
    }

    // Update Tree Sync
    await mutation({
      url: '/sync/',
      query: `setTreeStatus(input: $input)`,
      type: 'SetTreeStatusInput!',
      input: {
        space,
        id: tree,
        lastSync: (Date.now() / 1000 | 0),
        commit: sync,
      },
    });
  }
}

export default Component;
