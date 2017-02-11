const core = require('th-core');

class Component extends core(HTMLElement) {
  constructor() {
    super({
      attributes: Component.observedAttributes,
    });
  }

  static get observedAttributes() {
    return [
      'path',
    ];
  }

  _pathChanged(newPath, oldPath) {
    // TODO don't recreate when package is the same
    const path = decodeURI(newPath).split('/').filter((s)=>s !== '');
    if (path.length === 0) {
      // TODO handle index page?
      return this.innerHTML = '';
    }
    const pkg = TH[path.shift().toLowerCase()];
    if (pkg == undefined) {
      return this.innerText = 'Package not installed';
    }

    if (pkg.page == undefined) {
      return this.innerText = 'Package has no page';
    }
    this.innerHTML = `<${pkg.page} path="/${path.join('/')}"></${pkg.page}>`;
  }
}

const template = require('./template.html');
document.head.insertAdjacentHTML('beforeend', template);

window.customElements.define('th-page', Component);
