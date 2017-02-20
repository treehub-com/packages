const core = require('th-core');

class Component extends core(HTMLElement) {
  constructor() {
    super({
      attributes: Component.observedAttributes,
    });
  }

  static get observedAttributes() {
    return [
      'hash',
      'path',
    ];
  }

  _hashChanged(newHash, oldHash) {
    // Remove # if present
    if (newHash.length > 0 && newHash[0] === '#') {
      newHash = newHash.slice(1);
    }
    // TODO don't recreate when package is the same
    const path = decodeURI(newHash).split('/').filter((s)=>s !== '');

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
