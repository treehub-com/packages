const core = require('th-core');

class Component extends core(HTMLElement) {
  constructor() {
    super({
      template: 'th-nav',
    });
  }
}

const template = require('./template.html');
document.head.insertAdjacentHTML('beforeend', template);

window.customElements.define('th-nav', Component);
