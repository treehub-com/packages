class Component extends HTMLElement {
  connectedCallback() {
    for (const pkg of Object.keys(window._.packages)) {
      if (Array.isArray(window._.packages[pkg].taskbar)) {
        for (const elem of window._.packages[pkg].taskbar) {
          this.insertAdjacentHTML('beforeend', `<${elem}></${elem}>`);
        }
      }
    }
  }
}

export default Component;
