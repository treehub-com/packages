export default (_, {id}, {db}) => db.get(`space:${id}`);
