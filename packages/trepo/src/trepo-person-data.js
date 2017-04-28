import html from './trepo-person-data.html';
import attr from '@thp/mixins/attr';
import $ from '@thp/mixins/$';
import {query} from '@thp/lib/graphql';

const types = [
  {name: 'Name', element: 'trepo-name'},
  {name: 'Birth', element: 'trepo-birth', role: 'child'},
  {name: 'Marriage', element: 'trepo-marriage'},
  {name: 'Child (As Father)', element: 'trepo-birth', role: 'father'},
  {name: 'Child (As Mother)', element: 'trepo-birth', role: 'mother'},
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
      const elem = document.createElement('option');
      elem.value = type.element;
      elem.textContent = type.name;
      if (type.role) {
        elem.role = type.role;
      }
      this.$.select.insertAdjacentElement('beforeend', elem);
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
        births {id mother {id name {name}} father {id name {name}} child {id name {name}} place {name} date {original}}
        death {id place {name} date {original}}
        marriages {id spouses {id name {name}} place {name} date {original}}
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

    if (person.births) {
      for (let birth of person.births) {
        const elem = document.createElement('trepo-birth');
        elem.repo = this.repo;
        elem.person = id;
        elem.node = birth.id;
        elem.value = birth;
        if (birth.mother && birth.mother.id == id) {
          elem.role = 'mother';
        } else if (birth.father && birth.father.id == id) {
          elem.role = 'father';
        } else {
          elem.role = 'child';
        }
        this.$.data.appendChild(elem);
      }
    }

    if (person.marriages) {
      for (let marriage of person.marriages) {
        const elem = document.createElement('trepo-marriage');
        elem.repo = this.repo;
        elem.person = id;
        elem.node = marriage.id;
        elem.value = marriage;
        this.$.data.appendChild(elem);
      }
    }

    if (person.death) {
      const death = document.createElement('trepo-death');
      death.repo = this.repo;
      death.person = id;
      death.node = person.death.id;
      death.value = person.death;
      this.$.data.appendChild(death);
    }

    // TODO bind to deleted event and remove element?
  }

  add() {
    const element = this.$.select.value;
    const elem = document.createElement(element);
    // Set properties
    elem.repo = this.repo;
    elem.person = this.person;

    // Set additional properties based on type
    switch(element) {
      case 'trepo-birth':
        const idx = this.$.select.selectedIndex;
        const role = this.$.select.childNodes[idx].role;
        elem.role = role;
        break;
    }

    // Insert the element and enable the form
    this.$.data.insertAdjacentElement('afterbegin', elem);
    elem.form.dispatchEvent(new Event('enabled'));
    // TODO bind to created/"cancel" and move/delete element
    const removeOnCancel = () => elem.remove();
    elem.form.addEventListener('disabled', removeOnCancel);
    elem.form.addEventListener('created', () => {
      elem.form.removeEventListener('disabled', removeOnCancel);
      // TODO reorder the elements
    });
  }

  // TODO a function to order the data elements
}

export default Component;
