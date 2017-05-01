class Component extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', () => {
      const space = window.app.space;
      window.app.page = `/tree/${space.id}`;
    });
  }

  connectedCallback() {
    this.innerHTML = 'TREE';
  }
}

export default Component;
