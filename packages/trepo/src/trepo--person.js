import html from './trepo--person.html';
import $ from '@thp/mixins/$';
import attr from '@thp/mixins/attr';
import {commit} from '@thp/lib/graphql';

class Component extends attr($(HTMLElement)) {
  constructor() {
    super({
      attributes: Component.observedAttributes,
      $: {
        input: 'trepo--input',
        button: 'button',
      },
    });
    // Default values
    this._value = {}; // Looks like {id, name: {name}}
  }

  static get observedAttributes() {
    return [
      'label',
    ];
  }

  // We always store the value on our object
  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
    if (this.$) {
      this.setValue();
    }
  }

  connectedCallback() {
    this.innerHTML = html;
    super.connectedCallback();

    // Set values
    this.$.input.label = this.label || '';

    // Set value to name
    this.setValue();

    // Add create person event listener
    this.$.button.addEventListener('click', () => this.createPerson());

    // Add changed event listener
    this.$.input.addEventListener('changed', () => {
      this.$.button.removeAttribute('hidden');
    });
  }

  setValue() {
    if (this._value.name && this._value.name.name) {
      this.$.input.value = this._value.name.name;
    } else {
      this.$.input.value = this._value.id || '';
    }
  }

  async createPerson() {
    this.$.button.setAttribute('disabled', '');
    const name = this.$.input.value;
    const {id} = await commit({
      url: this.repo,
      query: 'createPerson(input: $input) { id }',
      type: 'PersonCreateInput',
      input: {
        name,
      },
      message: `Create ${name}`,
    });
    this._value = {
      id,
      name: {name},
    };
    this.$.button.setAttribute('hidden', '');
    this.$.button.removeAttribute('disabled');
  }

  _labelChanged(newValue, oldValue) {
    this.$.input.label = newValue;
  }
}

export default Component;
