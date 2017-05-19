import attr from '@thp/mixins/attr';

class Component extends attr(HTMLElement) {
  constructor() {
    super({
      attributes: Component.observedAttributes,
    });

    this.elements = {};
    this.selected = null;
  }

  static get observedAttributes() {
    return [
      'page',
    ];
  }

  connectedCallback() {
    super.connectedCallback();

    for (const name of Object.keys(window._.packages)) {
      const pkg = window._.packages[name];
      if (!pkg.provides || !pkg.provides.app || !pkg.provides.app.nav) {
        continue;
      }
      const nav = pkg.provides.app.nav;
      if (Array.isArray(nav)) {
        for (const elem of nav) {
          const node = document.createElement(elem);
          this.elements[name] = this.appendChild(node);
        }
      }
    }
  }

  _pageChanged(newPage, oldPage) {
    const parts = newPage.split('/').filter((s)=>s !== '');

    // Remove selected
    if (this.selected !== null) {
      this.selected.classList.remove('app-nav-selected');
    }

    // If we have a matching nav item, select it
    if (parts.length > 0 && this.elements[parts[0]] !== undefined) {
      this.selected = this.elements[parts[0]];
      this.selected.classList.add('app-nav-selected');
    }
  }
}

export default Component;
