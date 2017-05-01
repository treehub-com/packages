class Component extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', () => {
      window.app.page = '/test';
    });
  }

  connectedCallback() {
    this.innerHTML = 'TEST';
  }
}

export default Component;
