const Mixin = (superclass) => class $ extends superclass {
  constructor(args) {
    superclass.name === 'HTMLElement' ? super() : super(args);

    const {$ = {}} = args;
    this._$ = $;
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    this.$ = {};
    for (let key of Object.keys(this._$)) {
      this.$[key] = this.querySelector(this._$[key]);
    }
  }
};

export default Mixin;
