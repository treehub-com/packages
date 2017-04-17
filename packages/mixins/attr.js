const Mixin = (superclass) => class Attr extends superclass {
  constructor(args) {
    superclass.name === 'HTMLElement' ? super() : super(args);

    // We don't call change handlers until we are connected
    this._callAttrHandlers = false;

    const {attributes = []} = args;

    for (let attr of attributes) {
      Object.defineProperty(this, attr, {
        get: () => this.getAttribute(attr),
        // Setting to null removes the attribute,
        // and anything else is coerced to a string
        set: (val) => {
          if (val === null) {
            this.removeAttribute(attr);
          } else {
            this.setAttribute(attr, val);
          }
        },
      });
    }
  }

  // Only call callbacks after we connect and if there is a registered handler
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (this._callAttrHandlers && this[`_${attrName}Changed`]) {
      this[`_${attrName}Changed`].call(this, newVal, oldVal);
    }
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    this._callAttrHandlers = true;
  }
};

export default Mixin;
