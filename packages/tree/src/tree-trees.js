import html from './tree-trees.html';
import attr from '@thp/mixins/attr';
import graphql from '@thp/mixins/graphql';
import ref from '@thp/mixins/ref';

class Component extends graphql(ref(attr(HTMLElement))) {
  constructor() {
    super({
      attributes: Component.observedAttributes,
      html,
      $: {
        card: 'tree-trees-card',
      },
    });
  }

  static get observedAttributes() {
    return [
      'space',
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    this._spaceChanged(this.space, null);
  }

  _spaceChanged(newSpace, oldSpace) {
    this._getTrees(this.space);
  }

  async _getTrees(space) {
    const trees = await this._query({
      url: `/api/${space}`,
      query: 'trees { id name root {id type} }',
    });

    this.$.card.innerHTML = '';

    for (let tree of trees) {
      const a = document.createElement('a');
      a.href = `/tree/${space}/${tree.id}/${tree.root.id}`;
      a.textContent = tree.name;
      this.$.card.insertAdjacentElement('beforeend', a);
    }
  }
}

export default Component;
