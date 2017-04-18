const Mixin = (superclass) => class Ref extends superclass {
  constructor(args) {
    superclass.name === 'HTMLElement' ? super() : super(args);

    const {$ = {}, html = ''} = args;
    this.$ = $;
    this._refHTML = html;
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    // Attach our html
    this.innerHTML = this._refHTML;
    // Populate this.$
    for (let key of Object.keys(this.$)) {
      this.$[key] = this.querySelector(this.$[key]);
    }
  }
};

export default Mixin;
