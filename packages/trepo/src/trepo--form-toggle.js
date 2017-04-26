class Component extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', () => this.clicked());
  }
  connectedCallback() {
    // Get the form element
    this.form = this._findParentForm();

    // Listen for enabled/disabled events
    this.form.addEventListener('enabled', () => {
      this.form.setAttribute('enabled', '');
      this.textContent = 'cancel';
    });
    this.form.addEventListener('disabled', () => {
      this.form.removeAttribute('enabled');
      this.textContent = 'edit';
    });

    // Initialize our html
    if (this.form.getAttribute('enabled')) {
      this.textContent = 'cancel';
    } else {
      this.textContent = 'edit';
    }
  }
  clicked() {
    if (this.form.hasAttribute('enabled')) {
      this.form.dispatchEvent(new Event('disabled'));
    } else {
      this.form.dispatchEvent(new Event('enabled'));
    }
  }

  _findParentForm() {
    let node = this.parentNode;
    while (node) {
      if (node.nodeName === 'FORM') {
        return node;
      }
      node = node.parentNode;
    }
  }
}

export default Component;
