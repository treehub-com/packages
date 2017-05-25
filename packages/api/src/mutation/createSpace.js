export default async (_, {input}, {db}) => {
  const {id, name} = input;
  const response = {
    errors: [],
    space: null,
  };

  if (!/^[0-9a-z_]+$/.test(id)) {
    response.errors.push({
      key: 'id',
      message: 'id must match [0-9a-z_]+',
    });
    return response;
  }

  const exists = await db.get(`space:${id}`);

  if (exists !== undefined) {
    response.errors.push({
      key: 'id',
      message: 'space exists',
    });
    return response;
  }

  response.space = {id, name};
  await db.put(`space:${id}`, response.space);

  return response;
};
