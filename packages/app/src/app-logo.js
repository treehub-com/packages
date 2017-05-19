import html from './app-logo.html';

class Component extends HTMLElement {
  connectedCallback() {
    this.innerHTML = html;
  }
}

export default Component;
