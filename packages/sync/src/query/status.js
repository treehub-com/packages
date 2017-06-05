export default async (_, {space}, {db}) => {
  const response = await db.get(`status:${space}`);

  if (response === undefined) {
    return null;
  }

  response.trees = await db.values({
    gt: `status:${space}:`,
    lt: `status:${space}:\uffff`,
  });

  return response;
};
