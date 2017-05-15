import attr from '@thp/mixins/attr';
import graphql from '@thp/mixins/graphql';

class Component extends graphql(attr(HTMLElement)) {
  constructor() {
    super({
      attributes: Component.observedAttributes,
    });
  }

  static get observedAttributes() {
    return [
      'page',
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    this._pageChanged(this.page, null);
  }

  _pageChanged(newPage, oldPage) {
    // TODO don't recreate when package is the same
    const path = decodeURI(newPage).split('/').filter((s)=>s !== '');
    if (path.length === 0) {
      return this._indexPage();
    }
    const pkg = window._.packages[path.shift().toLowerCase()];
    if (pkg === undefined) {
      return this.innerText = 'Package not installed';
    }

    if (pkg.provides && pkg.provides.app &&
        pkg.provides.app.page === undefined) {
      return this.innerText = 'Package has no page';
    }
    const page = pkg.provides.app.page;
    this.innerHTML = `<${page} path="/${path.join('/')}"></${page}>`;
  }

  async _indexPage() {
    // Ensure _ space exists
    const space = await this._query({
      url: '/api/',
      query: 'space(id: $input) { id }',
      type: 'String!',
      input: '_',
    });

    if (space === null) {
      await this._mutation({
        url: '/api/',
        query: 'createSpace(input: $input) {errors {key message} space {id} }',
        type: 'CreateSpaceInput!',
        input: {id: '_'},
      });
    }

    // Ensure personal tree exists
    let tree = await this._query({
      url: '/api/_',
      query: 'tree(id: $input) { id name root {id type} }',
      type: 'String',
      input: 'personal',
    });

    if (tree === null) {
      await this._mutation({
        url: '/api/_',
        query: 'createTree(input: $input) { errors {key message} tree {id} }',
        type: 'CreateTreeInput!',
        input: {id: 'personal', name: 'personal'},
      });
      const {id} = await this._mutation({
        url: '/api/_/personal',
        query: 'createPerson(input: $input) { id }',
        type: 'PersonCreateInput',
        input: {name: 'Me'},
      });
      await this._mutation({
        url: '/api/_/personal',
        query: 'commit(input: $input) { id }',
        type: 'CommitInput',
        input: {
          author: 'TreeBot',
          email: 'treebot@treehub.com',
          message: 'Initial person',
        },
      });
      await this._mutation({
        url: '/api/_',
        query: 'updateTree(input: $input) { errors {key message} tree {id} }',
        type: 'UpdateTreeInput!',
        input: {id: 'personal', name: 'personal', root: {id, type: 'Person'}},
      });
      tree = await this._query({
        url: '/api/_',
        query: 'tree(id: $input) { id name root {id type} }',
        type: 'String',
        input: 'personal',
      });
      window.app.page = `/tree/_/personal/${id}`;
    } else {
      window.app.page = `/tree/_/personal/${tree.root.id}`;
    }
  }
}

export default Component;
