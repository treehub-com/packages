const core = require('th-core');

class Component extends core(HTMLElement) {
  constructor() {
    super({
      template: 'package-manager-taskbar',
    });
    this.addEventListener('click', () => {
      window.page = '/package-manager/';
    });
  }
}

const template = require('./template.html');
document.head.insertAdjacentHTML('beforeend', template);

window.customElements.define('package-manager-taskbar', Component);
