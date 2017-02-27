const core = require('th-core');

class Component extends core(HTMLElement) {
  constructor() {
    super({
      attributes: Component.observedAttributes,
    });
  }

  static get observedAttributes() {
    return [
      'aside',
      'page',
    ];
  }

  _asideChanged(newAside, oldAside) {
    // TODO don't recreate when package is the same
    const path = decodeURI(newAside).split('/').filter((s)=>s !== '');

    if (path.length === 0) {
      return this.innerHTML = '';
    }
    const pkg = window.packages[path.shift().toLowerCase()];
    if (pkg == undefined) {
      return this.innerText = 'Package not installed';
    }

    if (pkg.aside == undefined) {
      return this.innerText = 'Package has no aside';
    }
    this.innerHTML = `<${pkg.aside} path="/${path.join('/')}"></${pkg.aside}>`;
  }
}

const template = require('./template.html');
document.head.insertAdjacentHTML('beforeend', template);

window.customElements.define('th-aside', Component);
