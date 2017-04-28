function query({url, query, input, type}) {
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
};

function mutation({url, query, input, type}) {
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
};

async function commit({url, query, type, input, message}) {
  const result = await mutation({
    url,
    query,
    type,
    input,
  });
  await mutation({
    url,
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

export {query, mutation, commit};
