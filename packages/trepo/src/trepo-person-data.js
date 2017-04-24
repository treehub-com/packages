import attr from '@thp/mixins/attr';
import graphql from '@thp/mixins/graphql';

class Component extends graphql(attr(HTMLElement)) {
  constructor() {
    super({
      attributes: Component.observedAttributes,
    });
  }

  static get observedAttributes() {
    return [
      'person',
      'repo',
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
      url: this.repo,
      query: `person(id: $input) {
        name {id name}
      }`,
      type: 'String',
      input: id,
    });

    this.innerText = person.name.name;
  }
}

export default Component;
