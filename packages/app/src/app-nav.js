class Component extends HTMLElement {
  connectedCallback() {
    this.insertAdjacentHTML('beforeend', `<app-nav-logo></app-nav-logo>`);
    for (const pkg of Object.keys(window.packages)) {
      if (Array.isArray(window.packages[pkg].nav)) {
        for (const elem of window.packages[pkg].nav) {
          this.insertAdjacentHTML('beforeend', `<${elem}></${elem}>`);
        }
      }
    }
  }
}

export default Component;
