class Component extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', () => {
      const space = document.querySelector('app-space');
      window.app.page = `/tree/${space.space}`;
    });
  }

  connectedCallback() {
    this.innerHTML = 'TREE';
  }
}

export default Component;
