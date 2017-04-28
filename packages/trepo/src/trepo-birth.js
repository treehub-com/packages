import html from './trepo-birth.html';
import Base from './Base.js';
import {commit} from '@thp/lib/graphql';

class Component extends Base {
  constructor() {
    super({
      attributes: Component.observedAttributes,
      $: {
        title: 'trepo--title',
        mother: 'trepo--person[label="Mother"]',
        father: 'trepo--person[label="Father"]',
        child: 'trepo--person[label="Child"]',
        date: 'trepo--date',
        place: 'trepo--place',
      },
    });
    this.value = {}; // Default value
    this.role = 'child'; // Default role
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
    // TODO repo should come from people
    this.$.mother.value = this.value.mother || {};
    this.$.mother.repo = this.repo;
    this.$.father.value = this.value.father || {};
    this.$.father.repo = this.repo;
    this.$.child.value = this.value.child || {};
    this.$.child.repo = this.repo;
    this.$.date.value = this.value.date || {};
    this.$.place.value = this.value.place || {};

    // Setup base3d on role
    switch(this.role) {
      case 'mother':
        this.$.title.textContent = 'Child (As Mother)';
        this.$.mother.value = {id: this.person};
        this.$.mother.setAttribute('hidden', '');
        break;
      case 'father':
        this.$.title.textContent = 'Child (As Father)';
        this.$.father.value = {id: this.person};
        this.$.father.setAttribute('hidden', '');
        break;
      case 'child':
      default:
        this.$.title.textContent = 'Birth';
        this.$.child.value = {id: this.person};
        this.$.child.setAttribute('hidden', '');
    }

    // Initialize the form
    this.loaded({
      extant: this.node,
    });
  }

  async _create() {
    const {id} = await commit({
      url: this.repo,
      query: 'createBirth(input: $input) { id }',
      type: 'BirthCreateInput',
      input: {
        mother: this.$.mother.value.id,
        father: this.$.father.value.id,
        child: this.$.child.value.id,
        date: this.$.date.value,
        place: this.$.place.value,
      },
      message: 'Create Birth',
    });
    this.node = id;
  }

  async _update() {
    await commit({
      url: this.repo,
      query: 'updateBirth(input: $input) { id }',
      type: 'BirthUpdateInput',
      input: {
        id: this.node,
        mother: this.$.mother.value.id,
        father: this.$.father.value.id,
        child: this.$.child.value.id,
        date: this.$.date.value,
        place: this.$.place.value,
      },
      message: 'Update Birth',
    });
  }

  async _delete() {
    await commit({
      url: this.repo,
      query: 'deleteBirth(input: $input)',
      type: 'BirthInput',
      input: {
        id: this.node,
      },
      message: 'Delete Birth',
    });
    this.node = null;
  }

}

export default Component;
