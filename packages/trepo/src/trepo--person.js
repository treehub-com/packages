import html from './trepo--date.html';
import $ from '@thp/mixins/$';
import attr from '@thp/mixins/attr';

class Component extends attr($(HTMLElement)) {
  constructor() {
    super({
      attributes: Component.observedAttributes,
      $: {
        input: 'trepo--input',
      },
    });
    // Default value
    this._value = {};
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
  }

  connectedCallback() {
    this.innerHTML = html;
    super.connectedCallback();

    // Set values
    this.$.input.label = this.label || '';
    if (this._value.name && this._value.name.name) {
      this.$.input.value = this._value.name.name;
    } else {
      this.$.input.value = this._value.id || '';
    }
  }

  _labelChanged(newValue, oldValue) {
    this.$.input.label = newValue;
  }
}

export default Component;
