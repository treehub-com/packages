require('th-aside');
require('th-nav');
require('th-page');
require('th-taskbar');
const core = require('th-core');

class Component extends core(HTMLElement) {
  constructor() {
    super({
      template: 'th-app',
    });
  }
}

const template = require('./template.html');
document.head.insertAdjacentHTML('beforeend', template);

window.customElements.define('th-app', Component);
