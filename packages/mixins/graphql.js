const Mixin = (superclass) => class Graphql extends superclass {
  constructor(args) {
    superclass.name === 'HTMLElement' ? super() : super(args);
  }

  _query({url, query, input, type}) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: type ?
          `query x($input: ${type}) {x:${query}}` : `query {x:${query}}`,
        variables: JSON.stringify({
          input,
        }),
      }),
    })
    .then((res) => res.json())
    .then((json) => {
      if (json.errors) {
        const messages = [];
        for (const error of json.errors) {
          messages.push(error.message);
        }
        throw new Error(messages.join('\n'));
      }
      return json.data.x;
    });
  }

  _mutation({url, query, input, type}) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation x($input: ${type}) {
          x:${query}
        }`,
        variables: JSON.stringify({
          input,
        }),
      }),
    })
    .then((res) => res.json())
    .then((json) => {
      if (json.errors) {
        const messages = [];
        for (const error of json.errors) {
          messages.push(error.message);
        }
        throw new Error(messages.join('\n'));
      }
      return json.data.x;
    });
  }
};

export default Mixin;
