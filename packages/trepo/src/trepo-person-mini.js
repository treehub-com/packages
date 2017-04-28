import html from './trepo-person-mini.html';
import $ from '@thp/mixins/$';

class Component extends $(HTMLElement) {
  constructor() {
    super({
      $: {
        name: 'trepo-person-mini-name',
        lifespan: 'trepo-person-mini-lifespan',
      },
    });
    // Default value
    this._value = {
      name: '(Unknown)',
    };
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
    if (this.$) {
      this.updateUI();
    }
  }

  connectedCallback() {
    this.innerHTML = html;
    super.connectedCallback();

    this.updateUI();
  }

  updateUI() {
    this.$.name.innerHTML = '';
    if (this.value.url) {
      const a = document.createElement('a');
      a.href = this.value.url;
      a.textContent = this.value.name;
      this.$.name.appendChild(a);
    } else {
      this.$.name.textContent = this.value.name;
    }
    this.$.lifespan.textContent = `${this.value.birth} - ${this.value.death}`;
  }
}

export default Component;
