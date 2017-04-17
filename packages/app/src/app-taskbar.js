class Component extends HTMLElement {
  connectedCallback() {
    for (const pkg of Object.keys(window.packages)) {
      if (Array.isArray(window.packages[pkg].taskbar)) {
        for (const elem of window.packages[pkg].taskbar) {
          this.insertAdjacentHTML('beforeend', `<${elem}></${elem}>`);
        }
      }
    }
  }
}

export default Component;
