export default async (_, {input}, {db}) => {
  const {id, lastSync} = input;

  const exists = await db.get(`space:${id}`);

  if (exists === undefined) {
    throw new Error('space does not exist');
  }

  await db.put(`status:${id}`, {id, lastSync});

  return true;
};
