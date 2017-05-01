class Component extends HTMLElement {
  connectedCallback() {
    this.insertAdjacentHTML('beforeend', `<app-nav-logo></app-nav-logo>`);
    for (const name of Object.keys(window._.packages)) {
      const pkg = window._.packages[name];
      if (!pkg.provides || !pkg.provides.app || !pkg.provides.app.nav) {
        continue;
      }
      const nav = pkg.provides.app.nav;
      if (Array.isArray(nav)) {
        for (const elem of nav) {
          this.insertAdjacentHTML('beforeend', `<${elem}></${elem}>`);
        }
      }
    }
  }
}

export default Component;
