const core = require('th-core');

class Component extends core(HTMLElement) {
  constructor() {
    super({});
  }

  connectedCallback() {
    super.connectedCallback();

    for (const pkg of Object.keys(TH)) {
      if (Array.isArray(TH[pkg].taskbar)) {
        for (const elem of TH[pkg].taskbar) {
          this.insertAdjacentHTML('beforeend', `<${elem}></${elem}>`);
        }
      }
    }
  }
}

const template = require('./template.html');
document.head.insertAdjacentHTML('beforeend', template);

window.customElements.define('th-taskbar', Component);
