import attr from '@thp/mixins/attr';

class Component extends attr(HTMLElement) {
  constructor() {
    super({
      attributes: Component.observedAttributes,
    });
    // TODO switch to a setter/getter to update space when changed
    window.app.space = {
      id: '_',
      name: 'Local',
    };
  }

  static get observedAttributes() {
    return [
      'space',
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    const space = window.app.space;
    this.textContent = `Space: ${space.name} (${space.id})`;
  }

  _spaceChanged(newSpace, oldSpace) {
    console.log('space changed');
  }
}

export default Component;
