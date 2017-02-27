const core = require('th-core');

class Component extends core(HTMLElement) {
  constructor() {
    super({
      template: 'package-manager-page',
      $: {
        tbody: 'tbody',
        input: 'input',
        button: 'button',
        message: '#package-manager-page-message',
      },
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this.$.button.addEventListener('click', () => this._install());

    const keys = Object.keys(window.packages);
    keys.sort();
    for (const key of keys) {
      const pkg = window.packages[key];
      const row = this.$.tbody.insertRow();
      row.insertCell().insertAdjacentText('beforeend', pkg.name);
      row.insertCell().insertAdjacentText('beforeend', pkg.version);
    }
  }

  _install() {
    const pkg = this.$.input.value;
    this.$.message.innerText = '';
    this.$.button.setAttribute('disabled', 'disabled');
    fetch('/_/package/install', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({name: pkg}),
    })
    .then((res) => Promise.all([
      res.status,
      res.json(),
    ]))
    .then(([status, body]) => {
      console.log(status, body);
      if (status !== 200) {
        this.$.message.innerText = `Error: ${body.message}`;
      } else {
        this.$.message.innerText = `${pkg} installed. Please restart.`;
      }
      this.$.button.removeAttribute('disabled');
    })
    .catch((error) => {
      this.$.message.innerText = `Error: ${error.message}`;
      this.$.button.removeAttribute('disabled');
    });
  }
}

const template = require('./template.html');
document.head.insertAdjacentHTML('beforeend', template);

window.customElements.define('package-manager-page', Component);
