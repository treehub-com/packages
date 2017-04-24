import html from './tree-person.html';
import attr from '@thp/mixins/attr';
import graphql from '@thp/mixins/graphql';
import ref from '@thp/mixins/ref';

class Component extends graphql(ref(attr(HTMLElement))) {
  constructor() {
    super({
      attributes: Component.observedAttributes,
      html,
      $: {
        card: 'tree-person-card',
      },
    });
  }

  static get observedAttributes() {
    return [
      'space',
      'tree',
      'person',
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    this._personChanged(this.person, null);
  }

  _personChanged(newPerson, oldPerson) {
    const personMini = document.createElement('trepo-person-mini');
    personMini.value = {
      name: 'fake',
      birth: '1800',
      death: '1900',
    };
    const personData = document.createElement('trepo-person-data');
    personData.repo = `/api/${this.space}/${this.tree}`;
    personData.person = this.person;
    this.$.card.innerHTML = '';
    this.$.card.appendChild(personMini);
    this.$.card.appendChild(personData);
  }
}

export default Component;
