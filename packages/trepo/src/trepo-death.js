import html from './trepo-death.html';
import Base from './Base.js';
import {commit} from '@thp/lib/graphql';

class Component extends Base {
  constructor() {
    super({
      attributes: Component.observedAttributes,
      $: {
        date: 'trepo--date',
        place: 'trepo--place',
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
    this.$.date.value = this.value.date || {};
    this.$.place.value = this.value.place || {};

    // Initialize the form
    this.loaded({
      extant: this.node,
    });
  }

  async _create() {
    const {id} = await commit({
      url: this.repo,
      query: 'createDeath(input: $input) { id }',
      type: 'DeathCreateInput',
      input: {
        person: this.person,
        date: this.$.date.value,
        place: this.$.place.value,
      },
      message: 'Create Death',
    });
    this.node = id;
  }

  async _update() {
    await commit({
      url: this.repo,
      query: 'updateDeath(input: $input) { id }',
      type: 'DeathUpdateInput',
      input: {
        id: this.node,
        person: this.person,
        date: this.$.date.value,
        place: this.$.place.value,
      },
      message: 'Update Death',
    });
  }

  async _delete() {
    await commit({
      url: this.repo,
      query: 'deleteDeath(input: $input)',
      type: 'DeleteInput',
      input: {
        id: this.node,
      },
      message: 'Delete Death',
    });
    this.node = null;
  }

}

export default Component;
