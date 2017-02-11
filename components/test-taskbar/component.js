const core = require('th-core');

class Component extends core(HTMLElement) {
  constructor() {
    super({
      template: 'test-taskbar',
    });
  }
}

const template = require('./template.html');
document.head.insertAdjacentHTML('beforeend', template);

window.customElements.define('test-taskbar', Component);
