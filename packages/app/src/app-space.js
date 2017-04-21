import attr from '@thp/mixins/attr';

class Component extends attr(HTMLElement) {
  constructor() {
    super({
      attributes: Component.observedAttributes,
    });
    this.space = '_';
  }

  static get observedAttributes() {
    return [
      'space',
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    this.innerText = 'Space: Personal (_)';
  }

  _spaceChanged(newSpace, oldSpace) {
    console.log('space changed');
  }
}

export default Component;
