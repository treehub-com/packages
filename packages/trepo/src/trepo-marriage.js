import html from './trepo-marriage.html';
import Base from './Base.js';
import {commit} from '@thp/lib/graphql';

class Component extends Base {
  constructor() {
    super({
      attributes: Component.observedAttributes,
      $: {
        spouse: 'trepo--person',
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
    if (this.value.spouses) {
      for (let spouse of this.value.spouses) {
        if (spouse.id !== this.person) {
          this.$.spouse.value = spouse;
          break;
        }
      }
      // TODO this eventually needs to come from the spouse person
      this.$.spouse.repo = this.repo;
    } else {
      this.$.spouse.repo = this.repo;
    }
    this.$.date.value = this.value.date || {};
    this.$.place.value = this.value.place || {};

    // Initialize the form
    this.loaded({
      extant: this.node,
    });
  }

  async _create() {
    const spouses = [this.person];
    if (this.$.spouse.value.id) {
      spouses.push(this.$.spouse.value.id);
    }
    const {id} = await commit({
      url: this.repo,
      query: 'createMarriage(input: $input) { id }',
      type: 'MarriageCreateInput',
      input: {
        spouses,
        date: this.$.date.value,
        place: this.$.place.value,
      },
      message: 'Create Marriage',
    });
    this.node = id;
  }

  async _update() {
    const spouses = [this.person];
    if (this.$.spouse.value.id) {
      spouses.push(this.$.spouse.value.id);
    }
    await commit({
      url: this.repo,
      query: 'updateMarriage(input: $input) { id }',
      type: 'MarriageUpdateInput',
      input: {
        id: this.node,
        spouses,
        date: this.$.date.value,
        place: this.$.place.value,
      },
      message: 'Update Marriage',
    });
  }

  async _delete() {
    await commit({
      url: this.repo,
      query: 'deleteMarriage(input: $input)',
      type: 'DeleteInput',
      input: {
        id: this.node,
      },
      message: 'Delete Marriage',
    });
    this.node = null;
  }

}

export default Component;
