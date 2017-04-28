const Mixin = (superclass) => class Html extends superclass {
  constructor(args) {
    superclass.name === 'HTMLElement' ? super() : super(args);

    const {html = ''} = args;
    this._html = html;
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    this.innerHTML = this._html;
  }
};

export default Mixin;
