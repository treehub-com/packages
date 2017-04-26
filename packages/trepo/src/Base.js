import attr from '@thp/mixins/attr';
import $ from '@thp/mixins/$';

class Component extends attr($(HTMLElement)) {
  constructor(args) {
    super(args);
    this._value = {};
    this._form;
  }

  set value(data) {
    this._value = data;
  }

  connectedCallback() {
    super.connectedCallback();

    this._form = this.querySelector('form');
    this.$.form.addEventListener('create', () => {
      this._create()
        .then(() => {
          this._form.created();
        })
        .catch((error) => {
          this._form.errored(error.message);
        });
    });
    this.$.form.addEventListener('update', () => {
      this._update()
        .then(() => {
          this._form.updated();
        })
        .catch((error) => {
          this._form.errored(error.message);
        });
    });
    this.$.form.addEventListener('delete', () => {
      this._delete()
        .then(() => {
          this._form.deleted();
        })
        .catch((error) => {
          this._form.errored(error.message);
        });
    });
  }

  _form({extant, loaded}) {
    if (extant) {
      this._form.extant = true;
    }
    if (loaded) {
      this._form.loaded = true;
      this._form.dispatchEvent(new Event('loaded'));
    }
  }

}

export default Component;
