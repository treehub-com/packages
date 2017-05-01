class Component extends HTMLElement {
  connectedCallback() {
    for (const name of Object.keys(window._.packages)) {
      const pkg = window._.packages[name];
      if (!pkg.provides || !pkg.provides.app || !pkg.provides.app.taskbar) {
        continue;
      }
      const taskbar = pkg.provides.app.taskbar;
      if (Array.isArray(taskbar)) {
        for (const elem of taskbar) {
          this.insertAdjacentHTML('beforeend', `<${elem}></${elem}>`);
        }
      }
    }
  }
}

export default Component;
