class Component extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', () => {
      // TODO pull current space from the spaces package
      window.page = '/tree/_';
    });
  }

  connectedCallback() {
    this.innerHTML = 'TREE';
  }
}

export default Component;
