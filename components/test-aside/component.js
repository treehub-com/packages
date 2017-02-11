const core = require('th-core');

class Component extends core(HTMLElement) {
  constructor() {
    super({
      template: 'test-aside',
    });
  }
}

const template = require('./template.html');
document.head.insertAdjacentHTML('beforeend', template);

window.customElements.define('test-aside', Component);
