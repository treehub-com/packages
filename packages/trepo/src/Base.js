import attr from '@thp/mixins/attr';
import $ from '@thp/mixins/$';

class Component extends attr($(HTMLElement)) {
  constructor(args) {
    super(args);
  }

  connectedCallback() {
    super.connectedCallback();

    this.form = this.querySelector('form');
    this.form.addEventListener('create', () => {
      this._create()
        .then(() => {
          this.form.dispatchEvent(new Event('created'));
        })
        .catch((error) => {
          this.form.dispatchEvent(new CustomEvent('errored', {detail: error}));
        });
    });
    this.form.addEventListener('update', () => {
      this._update()
        .then(() => {
          this.form.dispatchEvent(new Event('updated'));
        })
        .catch((error) => {
          this.form.dispatchEvent(new CustomEvent('errored', {detail: error}));
        });
    });
    this.form.addEventListener('delete', () => {
      this._delete()
        .then(() => {
          this.form.dispatchEvent(new Event('deleted'));
        })
        .catch((error) => {
          this.form.dispatchEvent(new CustomEvent('errored', {detail: error}));
        });
    });
  }

  loaded({extant}) {
    const state = (extant) ? 'extant' : 'new';
    this.form.loaded = state;
    this.form.dispatchEvent(new CustomEvent('loaded', {detail: state}));
  }

}

export default Component;
