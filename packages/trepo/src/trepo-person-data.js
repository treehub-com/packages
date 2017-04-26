import html from './trepo-person-data.html';
import attr from '@thp/mixins/attr';
import $ from '@thp/mixins/$';
import {query} from '@thp/lib/graphql';

const types = [
  {name: 'Name', element: 'trepo-name'},
  {name: 'Birth', element: 'trepo-birth'},
  {name: 'Marriage', element: 'trepo-marriage'},
  {name: 'Child', element: 'trepo-birth'}, // TODO determine where to set person
  {name: 'Death', element: 'trepo-death'},
];

class Component extends attr($(HTMLElement)) {
  constructor() {
    super({
      attributes: Component.observedAttributes,
      $: {
        add: '.trepo-person-data-add',
        data: 'trepo-person-data-data',
        select: '.trepo-person-data-select',
      },
    });
  }

  static get observedAttributes() {
    return [
      'person',
      'repo',
    ];
  }

  connectedCallback() {
    this.innerHTML = html;
    super.connectedCallback();

    // Add add eventhandler
    this.$.add.addEventListener('click', () => this.add());

    // Populate select
    for (let type of types) {
      const elem = `<option value="${type.element}">${type.name}</option>`;
      this.$.select.insertAdjacentHTML('beforeend', elem);
    }

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
    this.$.data.appendChild(name);
  }

  add() {
    const element = this.$.select.value;
    const elem = document.createElement(element);

    switch(element) {
      case 'trepo-name':
        elem.repo = this.repo;
        elem.person = this.person;
        break;
    }

    // TODO bind to create/"cancel" and move/delete element

    this.$.data.insertAdjacentElement('afterbegin', elem);
  }

  // TODO a function to order the data elements
}

export default Component;
