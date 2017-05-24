export default (_, obj, {db}) => db.values({gt: 'space:', lte: 'space:\uffff'});
