const Mixin = (superclass) => class Form extends superclass {
  constructor(args) {
    superclass.name === 'HTMLElement' ? super() : super(args);

    const {form = {}} = args;
    this._form = form;
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }

    this._form = this.querySelector(selector);
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
};

export default Mixin;
