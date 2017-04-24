class Component extends HTMLElement {
  connectedCallback() {
    this.innerHTML = 'edit';
  }
}

export default Component;
