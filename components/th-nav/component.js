const core = require('th-core');

class Component extends core(HTMLElement) {
  constructor() {
    super({});
  }

  connectedCallback() {
    super.connectedCallback();

    for (const pkg of Object.keys(window.packages)) {
      if (Array.isArray(window.packages[pkg].nav)) {
        for (const elem of window.packages[pkg].nav) {
          this.insertAdjacentHTML('beforeend', `<${elem}></${elem}>`);
        }
      }
    }
  }
}

const template = require('./template.html');
document.head.insertAdjacentHTML('beforeend', template);

window.customElements.define('th-nav', Component);
