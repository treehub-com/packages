import attr from '@thp/mixins/attr';

class Component extends attr(HTMLElement) {
  constructor() {
    super({
      attributes: Component.observedAttributes,
    });
  }

  static get observedAttributes() {
    return [
      'path',
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    this._pathChanged(this.path, null);
  }

  _pathChanged(newPath, oldPath) {
    const parts = newPath.split('/').filter((x) => x !== '');

    switch(parts.length) {
      case 0:
        // TODO look at spaces context
        return window.page = '/tree/_';
      case 1:
        return this.innerHTML = `<tree-trees space="${parts[0]}"></tree-trees>`;
      case 2:
        // Forward to the space for now.
        // Eventually forward to default person
        return window.page = '/tree/_';
      case 3:
        return this.innerHTML = `<tree-person space="${parts[0]}" tree="${parts[1]}" person="${parts[2]}"></tree-person>`; // eslint-disable-line max-len
    }
  }
}

export default Component;
