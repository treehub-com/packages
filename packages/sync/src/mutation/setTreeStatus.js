export default async (_, {input}, {db}) => {
  const {space, id, lastSync, commit} = input;

  const exists = await db.get(`space:${space}`);

  if (exists === undefined) {
    throw new Error('space does not exist');
  }

  await db.put(`status:${space}:${id}`, {id, lastSync, commit});

  return true;
};
