import html from './trepo--input.html';
import attr from '@thp/mixins/attr';
import $ from '@thp/mixins/$';

class Component extends attr($(HTMLElement)) {
  constructor() {
    super({
      attributes: Component.observedAttributes,
      $: {
        label: 'label',
        input: 'input',
      },
    });
    this.addEventListener('click', () => this.clicked());
  }

  static get observedAttributes() {
    return [
      'label',
    ];
  }

  // Before we are connected, _value holds the value.
  // After we are connected, the input holds the value.
  // _value gets assigned to input on connectedCallback.
  get value() {
    if (this.$) {
      return this.$.input.value;
    }
    return this._value;
  }

  set value(value) {
    if (this.$) {
      return this.$.input.value = value;
    }
    this._value = value;
  }

  connectedCallback() {
    this.innerHTML = html;
    super.connectedCallback();

    this.form = this._findParentForm();

    // Bind to form enabled/disabled events
    this.form.addEventListener('enabled', () => {
      this.$.input.removeAttribute('disabled');
    });
    this.form.addEventListener('disabled', () => {
      this.$.input.setAttribute('disabled', '');
    });

    // Enable input if the form is enabled
    if (this.form.hasAttribute('enabled')) {
      this.$.input.removeAttribute('disabled');
    }

    // Listen for input event
    this.$.input.addEventListener('input', () => {
      this.form.dispatchEvent(new Event('changed'));
    });

    // Set values
    this.$.label.textContent = this.label;
    this.$.input.value = this._value;
  }

  clicked() {
    if (!this.$.input.hasAttribute('disabled')) {
      this.$.input.focus();
    }
  }

  _findParentForm() {
    let node = this.parentNode;
    while (node) {
      if (node.nodeName === 'FORM') {
        return node;
      }
      node = node.parentNode;
    }
  }
}

export default Component;
