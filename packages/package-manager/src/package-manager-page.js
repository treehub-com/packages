import html from './package-manager-page.html';
import ref from '@thp/mixins/ref';

class Component extends ref(HTMLElement) {
  constructor() {
    super({
      html,
      $: {
        button: '#package-manager-form button',
        form: '#package-manager-form',
        input: '#package-manager-input',
        message: 'package-manager-message',
        tbody: '#package-manager-list tbody',
        updated: 'package-manager-updated',
      },
    });
  }

  connectedCallback() {
    super.connectedCallback();

    // If the taskbar updated, show the update message
    const taskbar = document.querySelector('package-manager-taskbar');
    if (taskbar && taskbar.getAttribute('updated')) {
      this.$.updated.removeAttribute('hidden');
    }

    // Populate the table
    const keys = Object.keys(window._.packages);
    keys.sort();
    for (const key of keys) {
      const pkg = window._.packages[key];
      const row = this.$.tbody.insertRow();
      let version = pkg.version;
      if (!version) {
        version = '(linked)';
      }
      row.insertCell().insertAdjacentText('beforeend', pkg.name);
      row.insertCell().insertAdjacentText('beforeend', version);
    }

    // Bind to form submit
    this.$.form.addEventListener('submit', () => this._install());
  }

  _install() {
    const pkg = this.$.input.value.toLowerCase();
    if (!pkg) {
      return;
    }

    if (window._.packages[pkg] !== undefined) {
      this.$.message.innerText = `Package already installed`;
      return;
    }

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

export default Component;
