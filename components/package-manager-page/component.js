const core = require('th-core');

class Component extends core(HTMLElement) {
  constructor() {
    super({
      template: 'package-manager-page',
      $: {
        tbody: 'tbody',
      },
    });
  }

  connectedCallback() {
    super.connectedCallback();
    const keys = Object.keys(window.packages);
    keys.sort();
    for (const key of keys) {
      const pkg = window.packages[key];
      const row = this.$.tbody.insertRow();
      row.insertCell().insertAdjacentText('beforeend', pkg.name);
      row.insertCell().insertAdjacentText('beforeend', pkg.version);
    }
  }
}

const template = require('./template.html');
document.head.insertAdjacentHTML('beforeend', template);

window.customElements.define('package-manager-page', Component);
