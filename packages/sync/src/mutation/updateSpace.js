export default async (_, {input}, {db}) => {
  const {id, url, authorization} = input;

  const exists = await db.get(`space:${id}`);

  if (exists === undefined) {
    throw new Error('space does not exist');
  }

  const space = {id, url, authorization};
  await db.put(`space:${id}`, space);

  return space;
};
