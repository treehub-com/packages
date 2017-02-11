const core = require('th-core');

class Component extends core(HTMLElement) {
  constructor() {
    super({
      template: 'test-page',
    });
  }

  connectedCallback() {
    super.connectedCallback();

    fetch('/test/', {
      method: 'POST',
    })
    .then((res) => res.text())
    .then((data) => {
      this.insertAdjacentHTML('beforeend', data);
    });
  }
}

const template = require('./template.html');
document.head.insertAdjacentHTML('beforeend', template);

window.customElements.define('test-page', Component);
