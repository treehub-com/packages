import html from './test-page.html';

class Component extends HTMLElement {
  connectedCallback() {
    this.innerHTML = html;

    fetch('/test/', {
      method: 'POST',
    })
    .then((res) => res.text())
    .then((data) => {
      const card = document.createElement('test-card');
      card.textContent = data;
      this.insertAdjacentElement('beforeend', card);
    });
  }
}

export default Component;
