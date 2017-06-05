export default async (_, {input}, {db}) => {
  const {id} = input;

  const exists = await db.get(`space:${id}`);

  if (exists === undefined) {
    throw new Error('space does not exist');
  }

  await db.del(`space:${id}`);

  // Delete old status'
  const keys = await db.keys({
    gt: `status:${id}`,
    lt: `status:${id}\uffff`,
  });

  const batch = [];
  for (const key of keys) {
    batch.push({type: 'del', key});
  }

  await db.batch(batch);

  return true;
};
