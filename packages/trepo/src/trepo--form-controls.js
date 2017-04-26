import html from './trepo--form-controls.html';
import attr from '@thp/mixins/attr';
import $ from '@thp/mixins/$';

class Component extends attr($(HTMLElement)) {
  constructor() {
    super({
      attributes: Component.observedAttributes,
      $: {
        save: '.trepo--form-control-save',
        del: '.trepo--form-control-delete',
        yes: '.trepo--form-control-yes',
        no: '.trepo--form-control-no',
        message: '.trepo--form-control-message',
        error: '.trepo--form-control-error',
      },
    });
  }

  static get observedAttributes() {
    return [
      'state',
    ];
  }

  connectedCallback() {
    this.innerHTML = html;
    super.connectedCallback();

    // Get the form element
    this.form = this._findParentForm();

    this.addFormEventListeners();

    // Setup button event listeners
    this.addButtonEventListeners();

    this.state = 'initial';
  }

  _stateChanged(newState, oldState) {
    switch(newState) {
      case 'initial':
        this.setUI({
          buttons: [
            {id: 'save', visible: true, enabled: false},
            {id: 'del', visible: false, enabled: false},
            {id: 'yes', visible: false, enabled: false},
            {id: 'no', visible: false, enabled: false},
          ],
          message: '',
          error: '',
        });
        break;
      case 'new':
        this.setUI({
          buttons: [
            {id: 'save', visible: true, enabled: true},
            {id: 'del', visible: false, enabled: false},
            {id: 'yes', visible: false, enabled: false},
            {id: 'no', visible: false, enabled: false},
          ],
          message: '',
          error: '',
        });
        break;
      case 'creating':
        this.setUI({
          buttons: [
            {id: 'save', visible: true, enabled: false},
            {id: 'del', visible: false, enabled: false},
            {id: 'yes', visible: false, enabled: false},
            {id: 'no', visible: false, enabled: false},
          ],
          message: 'Creating...',
          error: '',
        });
        this.form.dispatchEvent(new Event('create'));
        break;
      case 'creating-error':
        this.setUI({
          buttons: [
            {id: 'save', visible: true, enabled: true},
            {id: 'del', visible: false, enabled: false},
            {id: 'yes', visible: false, enabled: false},
            {id: 'no', visible: false, enabled: false},
          ],
          message: '',
          error: this.error,
        });
        break;
      case 'extant':
        this.setUI({
          buttons: [
            {id: 'save', visible: true, enabled: false},
            {id: 'del', visible: true, enabled: true},
            {id: 'yes', visible: false, enabled: false},
            {id: 'no', visible: false, enabled: false},
          ],
          message: '',
          error: '',
        });
        break;
      case 'changed':
        this.setUI({
          buttons: [
            {id: 'save', visible: true, enabled: true},
            {id: 'del', visible: true, enabled: true},
            {id: 'yes', visible: false, enabled: false},
            {id: 'no', visible: false, enabled: false},
          ],
          message: '',
          error: '',
        });
        break;
      case 'saving':
        this.setUI({
          buttons: [
            {id: 'save', visible: true, enabled: false},
            {id: 'del', visible: true, enabled: false},
            {id: 'yes', visible: false, enabled: false},
            {id: 'no', visible: false, enabled: false},
          ],
          message: 'Saving...',
          error: '',
        });
        this.form.dispatchEvent(new Event('update'));
        break;
      case 'saving-error':
        this.setUI({
          buttons: [
            {id: 'save', visible: true, enabled: true},
            {id: 'del', visible: true, enabled: true},
            {id: 'yes', visible: false, enabled: false},
            {id: 'no', visible: false, enabled: false},
          ],
          message: '',
          error: this.error,
        });
        break;
      case 'changed-delete-confirmation':
        this.setUI({
          buttons: [
            {id: 'save', visible: false, enabled: false},
            {id: 'del', visible: false, enabled: false},
            {id: 'yes', visible: true, enabled: true},
            {id: 'no', visible: true, enabled: true},
          ],
          message: 'Are you sure?',
          error: '',
        });
        break;
      case 'changed-deleting':
        this.setUI({
          buttons: [
            {id: 'save', visible: true, enabled: false},
            {id: 'del', visible: true, enabled: false},
            {id: 'yes', visible: false, enabled: false},
            {id: 'no', visible: false, enabled: false},
          ],
          message: 'Deleting...',
          error: '',
        });
        this.form.dispatchEvent(new Event('delete'));
        break;
      case 'changed-deleting-error':
        this.setUI({
          buttons: [
            {id: 'save', visible: true, enabled: true},
            {id: 'del', visible: true, enabled: true},
            {id: 'yes', visible: false, enabled: false},
            {id: 'no', visible: false, enabled: false},
          ],
          message: '',
          error: this.error,
        });
        break;
      case 'extant-delete-confirmation':
        this.setUI({
          buttons: [
            {id: 'save', visible: false, enabled: false},
            {id: 'del', visible: false, enabled: false},
            {id: 'yes', visible: true, enabled: true},
            {id: 'no', visible: true, enabled: true},
          ],
          message: 'Are you sure?',
          error: '',
        });
        break;
      case 'extant-deleting':
        this.setUI({
          buttons: [
            {id: 'save', visible: true, enabled: false},
            {id: 'del', visible: true, enabled: false},
            {id: 'yes', visible: false, enabled: false},
            {id: 'no', visible: false, enabled: false},
          ],
          message: 'Deleting...',
          error: '',
        });
        this.form.dispatchEvent(new Event('delete'));
        break;
      case 'extant-deleting-error':
        this.setUI({
          buttons: [
            {id: 'save', visible: true, enabled: false},
            {id: 'del', visible: true, enabled: true},
            {id: 'yes', visible: false, enabled: false},
            {id: 'no', visible: false, enabled: false},
          ],
          message: '',
          error: this.error,
        });
        break;
    }
  }

  addFormEventListeners() {
    // Listen for the initial loaded event if we haven't loaded already
    if (this.form.loaded) {
      this.state = this.form.loaded;
    } else {
      this.form.addEventListener('loaded', (e) => {
        const state = e.detail || 'new';
        this.state = state;
      });
    }

    this.form.addEventListener('changed', () => {
      if (this.state == 'extant') {
        this.state = 'changed';
      }
      if (this.state == 'extant-delete-confirmation') {
        this.state = 'changed-delete-confirmation';
      }
      if (this.state == 'extant-deleting-error') {
        this.state = 'changed-deleting-error';
      }
    });
    this.form.addEventListener('created', () => {
      if (this.state == 'creating') {
        this.state = 'extant';
      }
    });
    this.form.addEventListener('updated', () => {
      if (this.state == 'saving') {
        this.state = 'extant';
      }
    });
    this.form.addEventListener('deleted', () => {
      if (['changed-deleting', 'extant-deleting'].includes(this.state)) {
        this.state = 'new';
      }
    });
    this.form.addEventListener('errored', (e) => {
      this.error = e.detail;
      if (this.state == 'creating') {
        this.state = 'creating-error';
      }
      if (this.state == 'saving') {
        this.state = 'saving-error';
      }
      if (this.state == 'changed-deleting') {
        this.state = 'changed-deleting-error';
      }
      if (this.state == 'extant-deleting') {
        this.state = 'extant-deleting-error';
      }
    });

    // On form submit click the save button
    // TODO
  }

  addButtonEventListeners() {
    this.$.save.addEventListener('click', () => {
      if (['new', 'creating-error'].includes(this.state)) {
        this.state = 'creating';
      }
      if (['changed', 'saving-error', 'changed-deleting-error']
        .includes(this.state)) {
        this.state = 'saving';
      }
    });
    this.$.del.addEventListener('click', () => {
      if (['extant', 'extant-deleting-error'].includes(this.state)) {
        this.state = 'extant-delete-confirmation';
      }
      if (['changed', 'saving-error', 'changed-deleting-error']
        .includes(this.state)) {
        this.state = 'changed-delete-confirmation';
      }
    });
    this.$.yes.addEventListener('click', () => {
      if ('changed-delete-confirmation' === this.state) {
        this.state = 'changed-deleting';
      }
      if ('extant-delete-confirmation' === this.state) {
        this.state = 'extant-deleting';
      }
    });
    this.$.no.addEventListener('click', () => {
      if ('changed-delete-confirmation' === this.state) {
        this.state = 'changed';
      }
      if ('extant-delete-confirmation' === this.state) {
        this.state = 'extant';
      }
    });
  }

  setUI({buttons, message, error}) {
    for (let button of buttons) {
      if (button.visible) {
        this.$[button.id].removeAttribute('hidden');
      } else {
        this.$[button.id].setAttribute('hidden', '');
      }
      if (button.enabled) {
        this.$[button.id].removeAttribute('disabled');
      } else {
        this.$[button.id].setAttribute('disabled', '');
      }
    }
    this.$.message.innerText = message;
    this.$.error.innerText = error;
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
