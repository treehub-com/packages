import html from './package-manager-page.html';

class Component extends HTMLElement {
  connectedCallback() {
    this.innerHTML = html;



    const tbody = this.querySelector('#package-manager-list tbody');

    const keys = Object.keys(window.packages);
    keys.sort();
    for (const key of keys) {
      const pkg = window.packages[key];
      const row = tbody.insertRow();
      let version = pkg.version;
      if (!version) {
        version = '(linked)';
      }
      row.insertCell().insertAdjacentText('beforeend', pkg.name);
      row.insertCell().insertAdjacentText('beforeend', version);
    }
  }

  _install() {
    const pkg = this.querySelector('#package-manager-input').value;
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
