class Component extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = 'Sync Page';
  }
}

export default Component;
