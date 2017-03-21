const core = require('th-core');

class Component extends core(HTMLElement) {
  constructor() {
    super({
      template: 'test-nav',
    });
    this.addEventListener('click', () => {
      window.page = '/test/#/test/';
    });
  }
}

const template = require('./template.html');
document.head.insertAdjacentHTML('beforeend', template);

window.customElements.define('test-nav', Component);
