import attr from '@thp/mixins/attr';

class Component extends attr(HTMLElement) {
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

  connectedCallback() {
    super.connectedCallback();
    this._asideChanged(this.aside, null);
  }

  _asideChanged(newAside, oldAside) {
    // TODO don't recreate when package is the same
    const path = decodeURI(newAside).split('/').filter((s)=>s !== '');

    if (path.length === 0) {
      return this.innerHTML = '';
    }
    const pkg = window._.packages[path.shift().toLowerCase()];
    if (pkg === undefined) {
      return this.innerText = 'Package not installed';
    }

    if (pkg.provides && pkg.provides.app &&
        pkg.provides.app.aside === undefined) {
      return this.innerText = 'Package has no aside';
    }
    const aside = pkg.provides.app.aside;
    this.innerHTML = `<${aside} path="/${path.join('/')}"></${aside}>`;
  }
}

export default Component;
