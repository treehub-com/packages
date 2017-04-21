const Mixin = (superclass) => class $ extends superclass {
  constructor(args) {
    superclass.name === 'HTMLElement' ? super() : super(args);

    const {$ = {}} = args;
    this.$ = $;
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    for (let key of Object.keys(this.$)) {
      this.$[key] = this.querySelector(this.$[key]);
    }
  }
};

export default Mixin;
