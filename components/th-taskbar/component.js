const core = require('th-core');

class Component extends core(HTMLElement) {
  constructor() {
    super({});
  }

  connectedCallback() {
    super.connectedCallback();

    for (const pkg of Object.keys(window.packages)) {
      if (Array.isArray(window.packages[pkg].taskbar)) {
        for (const elem of window.packages[pkg].taskbar) {
          this.insertAdjacentHTML('beforeend', `<${elem}></${elem}>`);
        }
      }
    }
  }
}

const template = require('./template.html');
document.head.insertAdjacentHTML('beforeend', template);

window.customElements.define('th-taskbar', Component);
