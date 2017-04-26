import attr from '@thp/mixins/attr';
import {query} from '@thp/lib/graphql';

class Component extends attr(HTMLElement) {
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
    const person = await query({
      url: this.repo,
      query: `person(id: $input) {
        name {id name}
      }`,
      type: 'String',
      input: id,
    });

    const name = document.createElement('trepo-name');
    name.repo = this.repo;
    name.person = id;
    name.node = person.name.id;
    name.value = person.name;
    this.appendChild(name);
  }
}

export default Component;
