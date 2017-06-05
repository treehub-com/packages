import html from './sync-spaces.html';
import $ from '@thp/mixins/$';
import {query} from '@thp/lib/graphql.js';

class Component extends $(HTMLElement) {
  constructor() {
    super({
      $: {
        tbody: '#sync-list tbody',
      },
    });
  }

  connectedCallback() {
    this.innerHTML = html;
    super.connectedCallback();
    this._populateTable();
  }

  async _populateTable() {
    const spaces = await query({
      url: '/api/',
      query: 'spaces {id name}',
    });

    const syncSpaces = await query({
      url: '/sync/',
      query: 'spaces {id url authorization}',
    });
    const sync = {};
    for (const space of syncSpaces) {
      sync[space.id] = space;
    }

    for (const space of spaces) {
      const syncSpace = sync[space.id] ? sync[space.id] : {};
      const row = this.$.tbody.insertRow();
      const link = document.createElement('a');
      link.href = `/sync/${space.id}`;
      link.textContent = space.name;
      row.insertCell().appendChild(link);
      row.insertCell().textContent = syncSpace.url;
      row.insertCell().textContent = syncSpace.authorization;
    }
  }
}

export default Component;
