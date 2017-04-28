import html from './tree-person.html';
import attr from '@thp/mixins/attr';
import ref from '@thp/mixins/ref';
import {query} from '@thp/lib/graphql';

class Component extends ref(attr(HTMLElement)) {
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
    this.layoutPage();
  }

  async layoutPage() {
    const {name, birth, death} = await query({
      url: `/api/${this.space}/${this.tree}`,
      query: `person(id: $input) {
        name {name}
        birth {date {original}}
        death {date {original}}
      }`,
      type: 'String',
      input: this.person,
    });

    const personMini = document.createElement('trepo-person-mini');
    personMini.value = {
      name: (name) ? name.name : '(Unknown)',
      url: `/tree/${this.space}/${this.tree}/${this.person}`,
      birth: (birth && birth.date) ? birth.date.original : '?',
      death: (death && death.date) ? death.date.original : '?',
    };
    const personData = document.createElement('trepo-person-data');
    personData.repo = `/api/${this.space}/${this.tree}`;
    personData.person = this.person;
    this.$.card.innerHTML = '';
    this.$.card.appendChild(personMini);
    this.$.card.appendChild(personData);
    // TODO listen for changes and update person-minis
  }
}

export default Component;
