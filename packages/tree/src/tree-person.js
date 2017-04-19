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
    this._getPerson(newPerson);
  }

  async _getPerson(id) {
    const person = await this._query({
      url: `/api/${this.space}/${this.tree}`,
      query: 'person(id: $input) { name {id name} }',
      type: 'String',
      input: id,
    });

    this.$.card.textContent = person.name.name;
  }
}

export default Component;
