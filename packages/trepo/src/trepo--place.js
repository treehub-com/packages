import html from './trepo--place.html';
import $ from '@thp/mixins/$';

class Component extends $(HTMLElement) {
  constructor() {
    super({
      $: {
        input: 'trepo--input',
      },
    });
    // Default value
    this._value = {};
  }

  // Before we are connected, _value holds the value.
  // After we are connected, the input holds the value.
  // _value gets assigned to input on connectedCallback.
  get value() {
    if (this.$) {
      return {
        name: this.$.input.value,
      };
    }
    return this._value;
  }

  set value(value) {
    if (this.$) {
      const {name} = value;
      return this.$.input.value = name || '';
    }
    this._value = value;
  }

  connectedCallback() {
    this.innerHTML = html;
    super.connectedCallback();

    // Set value
    this.$.input.value = this._value;
  }
}

export default Component;
