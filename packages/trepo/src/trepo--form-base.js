import attr from '@thp/mixins/attr';
import graphql from '@thp/mixins/graphql';
import $ from '@thp/mixins/$';
import html from '@thp/mixins/html';

class Component extends graphql(attr($(html(HTMLElement)))) {
  constructor(args) {
    super(args);
    this._value = {};
    this._form;
  }

  static get observedAttributes() {
    return [
      'repo',
    ];
  }

  set value(data) {
    this._value = data;
  }

  connectedCallback() {
    super.connectedCallback();

    this._form = this.querySelector('form');
    this.$.form.addEventListener('create', () => {
      this._create()
        .then(() => {
          this._form.created();
        })
        .catch((error) => {
          this._form.errored(error.message);
        });
    });
    this.$.form.addEventListener('update', () => {
      this._update()
        .then(() => {
          this._form.updated();
        })
        .catch((error) => {
          this._form.errored(error.message);
        });
    });
    this.$.form.addEventListener('delete', () => {
      this._delete()
        .then(() => {
          this._form.deleted();
        })
        .catch((error) => {
          this._form.errored(error.message);
        });
    });
  }

  _form({extant, loaded}) {
    if (extant) {
      this._form.extant = true;
    }
    if (loaded) {
      this._form.loaded = true;
      this._form.dispatchEvent(new Event('loaded'));
    }
  }

  async _create({query, type, input, message}) {
    const result = await this._mutation({
      url: this.repo,
      query,
      type,
      input,
    });
    await this._mutation({
      url: this.repo,
      query: 'commit(input: $input) { id }',
      type: 'CommitInput',
      input: {
        author: 'TreeBot',
        email: 'treebot@treehub.com',
        message,
      },
    });
    return result;
  }

  async _update({query, type, input, message}) {
    const result = await this._mutation({
      url: this.repo,
      query,
      type,
      input,
    });
    await this._mutation({
      url: this.repo,
      query: 'commit(input: $input) { id }',
      type: 'CommitInput',
      input: {
        author: 'TreeBot',
        email: 'treebot@treehub.com',
        message,
      },
    });
    return result;
  }

  async _delete({query, type, input, message}) {
    const result = await this._mutation({
      url: this.repo,
      query,
      type,
      input,
    });
    await this._mutation({
      url: this.repo,
      query: 'commit(input: $input) { id }',
      type: 'CommitInput',
      input: {
        author: 'TreeBot',
        email: 'treebot@treehub.com',
        message,
      },
    });
    return result;
  }

}

export default Component;
