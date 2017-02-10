module.exports = (superclass) => class extends superclass {
  constructor(args) {
    superclass.name === 'HTMLElement' ? super() : super(args);

    // We start out not connected
    this._connected = false;

    // Setup js getters/setters for each attribute
    // Attributes and getters/setters are always kept in sync
    // All attributes are strings, matching the dom spec/behavior
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

    // Grab a template if passed in
    const {template = null, shadow = false} = args;
    if (template) {
      this._template = document.querySelector(`#${template}`);
      if (shadow) {
        this._root = this.attachShadow({mode: 'open'});
      } else {
        this._root = this;
      }
    }

    // Setup $ object, which we populate in connectedCallback
    const {$ = {}} = args;
    this.$ = $;
  }

  // Only call callbacks after we connect and if there is a registered handler
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (this._connected && this[`_${attrName}Changed`]) {
      this[`_${attrName}Changed`].call(this, newVal, oldVal);
    }
  }

  connectedCallback() {
    // Spec says that connectedCallback may be called more than once,
    // so we guard against that
    if (this._connected) {
      return;
    }

    // If we have a template, add it to our root
    if (this._template) {
      this._root.appendChild(this._template.content.cloneNode(true));
      // Map all of our $ shortcuts
      for (let key of Object.keys(this.$)) {
        this.$[key] = this._root.querySelector(this.$[key]);
      }
    }

    // We are now connected
    this._connected = true;
  }
};
