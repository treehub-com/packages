const core = require('th-core');

class Component extends core(HTMLElement) {
  constructor() {
    super({
      template: 'th-aside',
    });
  }
}

const template = require('./template.html');
document.head.insertAdjacentHTML('beforeend', template);

window.customElements.define('th-aside', Component);
