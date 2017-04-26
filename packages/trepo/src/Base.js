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
          this._form.created();
        })
        .catch((error) => {
          this._form.errored(error.message);
        });
    });
    form.addEventListener('update', () => {
      this._update()
        .then(() => {
          this._form.updated();
        })
        .catch((error) => {
          this._form.errored(error.message);
        });
    });
    form.addEventListener('delete', () => {
      this._delete()
        .then(() => {
          this._form.deleted();
        })
        .catch((error) => {
          this._form.errored(error.message);
        });
    });
  }

  init({extant, loaded}) {
    const form = this.querySelector('form');
    if (extant) {
      form.extant = true;
    }
    if (loaded) {
      form.loaded = true;
      form.dispatchEvent(new Event('loaded'));
    }
  }

}

export default Component;
