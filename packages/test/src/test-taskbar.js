class Component extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', () => {
      window.page = '/test';
    });
  }

  connectedCallback() {
    this.innerHTML = 'TEST';
  }
}

export default Component;
