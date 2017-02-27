const core = require('th-core');

class Component extends core(HTMLElement) {
  constructor() {
    super({
      template: 'package-manager-page',
    });
  }
}

const template = require('./template.html');
document.head.insertAdjacentHTML('beforeend', template);

window.customElements.define('package-manager-page', Component);
