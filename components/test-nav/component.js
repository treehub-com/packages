const core = require('th-core');

class Component extends core(HTMLElement) {
  constructor() {
    super({
      template: 'test-nav',
    });
  }
}

const template = require('./template.html');
document.head.insertAdjacentHTML('beforeend', template);

window.customElements.define('test-nav', Component);
