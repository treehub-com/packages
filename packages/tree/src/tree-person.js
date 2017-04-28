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
        children: 'tree-person-children',
        spouses: 'tree-person-spouses',
        parents: 'tree-person-parents',
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
    // TODO clear out any leftovers
    this.$.card.innerHTML = '';
    this.layoutPage();
  }

  async layoutPage() {
    const {name, birth, births, marriages, death} = await query({
      url: `/api/${this.space}/${this.tree}`,
      query: `person(id: $input) {
        name {name}
        birth {date {original}}
        births {
          mother {id name {name} birth {date {original}} death {date {original}}}
          father {id name {name} birth {date {original}} death {date {original}}}
          child {id name {name} birth {date {original}} death {date {original}}}
        }
        marriages {
          spouses {id name {name} birth {date {original}} death {date {original}}}
        }
        death {date {original}}
      }`,
      type: 'String',
      input: this.person,
    });

    // Self
    const mini = document.createElement('trepo-person-mini');
    mini.value = {
      name: (name) ? name.name : '(Unknown)',
      // No url for self
      birth: (birth && birth.date) ? birth.date.original : '?', // eslint-disable-line max-len
      death: (death && death.date) ? death.date.original : '?', // eslint-disable-line max-len
    };
    this.$.card.appendChild(mini);

    // Marriages
    if (marriages) {
      for (let marriage of marriages) {
        for (let spouse of marriage.spouses) {
          if (spouse.id === this.person) {
            continue;
          }
          const mini = document.createElement('trepo-person-mini');
          mini.value = {
            name: (spouse.name) ? spouse.name.name : '(Unknown)',
            // TODO pull repo from person
            url: `/tree/${this.space}/${this.tree}/${spouse.id}`,
            birth: (spouse.birth && spouse.birth.date) ? spouse.birth.date.original : '?', // eslint-disable-line max-len
            death: (spouse.death && spouse.death.date) ? spouse.death.date.original : '?', // eslint-disable-line max-len
          };
          this.$.spouses.appendChild(mini);
        }
      }
    }

    // Births
    if (births) {
      for (let birth of births) {
        // Children
        if ( ((birth.mother && birth.mother.id === this.person) ||
              (birth.father && birth.father.id === this.person))
            && birth.child) {
          const mini = document.createElement('trepo-person-mini');
          mini.value = {
            name: (birth.child.name) ? birth.child.name.name : '(Unknown)',
            // TODO pull repo from person
            url: `/tree/${this.space}/${this.tree}/${birth.child.id}`,
            birth: (birth.child.birth && birth.child.birth.date) ? birth.child.birth.date.original : '?', // eslint-disable-line max-len
            death: (birth.child.death && birth.child.death.date) ? birth.child.death.date.original : '?', // eslint-disable-line max-len
          };
          this.$.children.appendChild(mini);
        }
        // Father
        if (birth.child && birth.child.id === this.person && birth.father) {
          const mini = document.createElement('trepo-person-mini');
          mini.value = {
            name: (birth.father.name) ? birth.father.name.name : '(Unknown)',
            // TODO pull repo from person
            url: `/tree/${this.space}/${this.tree}/${birth.father.id}`,
            birth: (birth.father.birth && birth.father.birth.date) ? birth.father.birth.date.original : '?', // eslint-disable-line max-len
            death: (birth.father.death && birth.father.death.date) ? birth.father.death.date.original : '?', // eslint-disable-line max-len
          };
          this.$.parents.appendChild(mini);
        }
        // Mother
        if (birth.child && birth.child.id === this.person && birth.mother) {
          const mini = document.createElement('trepo-person-mini');
          mini.value = {
            name: (birth.mother.name) ? birth.mother.name.name : '(Unknown)',
            // TODO pull repo from person
            url: `/tree/${this.space}/${this.tree}/${birth.father.id}`,
            birth: (birth.mother.birth && birth.mother.birth.date) ? birth.mother.birth.date.original : '?', // eslint-disable-line max-len
            death: (birth.mother.death && birth.mother.death.date) ? birth.mother.death.date.original : '?', // eslint-disable-line max-len
          };
          this.$.parents.appendChild(mini);
        }
      }
    }

    // Main Person Data
    const personData = document.createElement('trepo-person-data');
    personData.repo = `/api/${this.space}/${this.tree}`;
    personData.person = this.person;
    this.$.card.appendChild(personData);
    // TODO listen for changes and update person-minis
  }
}

export default Component;
