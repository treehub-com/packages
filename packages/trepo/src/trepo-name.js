import template from './trepo-name.html';
import attr from '@thp/mixins/attr';
import form from '@thp/mixins/form';
import graphql from '@thp/mixins/graphql';
import $ from '@thp/mixins/$';
import html from '@thp/mixins/html';

class Component extends graphql(form(attr($(html(HTMLElement))))) {
  constructor() {
    super({
      attributes: Component.observedAttributes,
      html: template,
      $: {
        name: '#trepo-name-name',
      },
      form: 'form',
    });
    this._init = {};
  }

  static get observedAttributes() {
    return [
      'node',
      'person',
      'repo',
    ];
  }

  init(data) {
    this._init = data;
  }

  connectedCallback() {
    super.connectedCallback();

    // Populate inputs
    this.$.name.value = this._init.name;

    // Initialize the form
    this._form({
      extant: this.node,
      loaded: true,
    });
  }

  async _create() {
    const {id} = this._mutation({
      url: this.repo,
      query: 'createName(input: $input) { id }',
      type: 'NameCreateInput',
      input: {
        person: this.person,
        name: this.$.name.value,
      },
    });
    await this._mutation({
      url: '/api/_/personal',
      query: 'commit(input: $input) { id }',
      type: 'CommitInput',
      input: {
        author: 'TreeBot',
        email: 'treebot@treehub.com',
        message: 'Create Name',
      },
    });
    this.node = id;
  }

  async _update() {
    this._mutation({
      url: this.repo,
      query: 'UpdateName(input: $input) { id }',
      type: 'NameUpdateInput',
      input: {
        id: this.node,
        person: this.person,
        name: this.$.name.value,
      },
    });
    await this._mutation({
      url: '/api/_/personal',
      query: 'commit(input: $input) { id }',
      type: 'CommitInput',
      input: {
        author: 'TreeBot',
        email: 'treebot@treehub.com',
        message: 'Update Name',
      },
    });
  }

  async _delete() {
    this._mutation({
      url: this.repo,
      query: 'DeleteName(input: $input) { id }',
      type: 'DeleteInput',
      input: {
        id: this.node,
      },
    });
    await this._mutation({
      url: '/api/_/personal',
      query: 'commit(input: $input) { id }',
      type: 'CommitInput',
      input: {
        author: 'TreeBot',
        email: 'treebot@treehub.com',
        message: 'Delete Name',
      },
    });
    this.node = null;
  }

}

export default Component;
