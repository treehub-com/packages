import html from './trepo-name.html';
import Base from './Base.js';
import {commit} from '@thp/lib/graphql';

class Component extends Base {
  constructor() {
    super({
      attributes: Component.observedAttributes,
      $: {
        name: 'trepo--input[label="Full Name"]',
      },
    });
    this.value = {}; // Default value
  }

  static get observedAttributes() {
    return [
      'node',
      'person',
      'repo',
    ];
  }

  connectedCallback() {
    this.innerHTML = html;
    super.connectedCallback();

    // Populate inputs
    // this.$.name.value = this._value.name;

    // Initialize the form
    this.init({
      extant: this.node,
      loaded: true,
    });
  }

  async _create() {
    const {id} = await commit({
      url: this.repo,
      query: 'createName(input: $input) { id }',
      type: 'NameCreateInput',
      input: {
        person: this.person,
        name: this.$.name.value,
      },
      message: 'Create Name',
    });
    this.node = id;
  }

  async _update() {
    await commit({
      url: this.repo,
      query: 'UpdateName(input: $input) { id }',
      type: 'NameUpdateInput',
      input: {
        id: this.node,
        person: this.person,
        name: this.$.name.value,
      },
      message: 'Update Name',
    });
  }

  async _delete() {
    await commit({
      url: this.repo,
      query: 'DeleteName(input: $input) { id }',
      type: 'DeleteInput',
      input: {
        id: this.node,
      },
      message: 'Delete Name',
    });
    this.node = null;
  }

}

export default Component;
