import html from './test-aside.html';

class Component extends HTMLElement {
  connectedCallback() {
    this.innerHTML = html;
  }
}

export default Component;
