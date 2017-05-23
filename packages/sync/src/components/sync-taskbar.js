class Component extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', () => {
      window.app.page = '/sync/';
    });
  }

  connectedCallback() {
    this.innerHTML = 'SYNC';
  }
}

export default Component;
