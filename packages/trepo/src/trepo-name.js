import html from './trepo-name.html';
import Base from './trepo--form-base.js';

class Component extends Base {
  constructor() {
    super({
      attributes: Component.observedAttributes,
      html,
      $: {
        name: 'trepo--input[label="Full Name"]',
      },
    });
  }

  static get observedAttributes() {
    return super.observedAttributes.concat([
      'node',
      'person',
    ]);
  }

  connectedCallback() {
    super.connectedCallback();

    // Populate inputs
    this.$.name.value = this._value.name;

    // Initialize the form
    this._form({
      extant: this.node,
      loaded: true,
    });
  }

  async _create() {
    const {id} = await super._create({
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
    await super._create({
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
    await super._create({
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
