class Component extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', () => {
      window.page = '/package-manager/';
    });
  }

  connectedCallback() {
    this.innerHTML = 'PACKAGES';
  }
}

export default Component;
