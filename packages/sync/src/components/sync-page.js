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

    if (parts.length === 0) {
      this.innerHTML = '<sync-spaces></sync-spaces>';
    } else {
      this.innerHTML = `<sync-space space="${parts[0]}"></sync-space>`;
    }
  }
}

export default Component;
