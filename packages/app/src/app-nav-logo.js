import html from './app-nav-logo.html';

class Component extends HTMLElement {
  connectedCallback() {
    this.innerHTML = html;
  }
}

export default Component;
