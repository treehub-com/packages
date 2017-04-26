import attr from '@thp/mixins/attr';
import $ from '@thp/mixins/$';

class Component extends attr($(HTMLElement)) {
  constructor(args) {
    super(args);
  }

  connectedCallback() {
    super.connectedCallback();

    const form = this.querySelector('form');
    form.addEventListener('create', () => {
      this._create()
        .then(() => {
          form.dispatchEvent(new Event('created'));
        })
        .catch((error) => {
          form.dispatchEvent(new CustomEvent('errored', {detail: error}));
        });
    });
    form.addEventListener('update', () => {
      this._update()
        .then(() => {
          form.dispatchEvent(new Event('updated'));
        })
        .catch((error) => {
          form.dispatchEvent(new CustomEvent('errored', {detail: error}));
        });
    });
    form.addEventListener('delete', () => {
      this._delete()
        .then(() => {
          form.dispatchEvent(new Event('deleted'));
        })
        .catch((error) => {
          form.dispatchEvent(new CustomEvent('errored', {detail: error}));
        });
    });
  }

  loaded({extant}) {
    const form = this.querySelector('form');
    const state = (extant) ? 'extant' : 'new';
    form.loaded = state;
    form.dispatchEvent(new CustomEvent('loaded', {detail: state}));
  }

}

export default Component;
