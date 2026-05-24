const User = require('./user.model');

const create = (data) => User.create(data);
const findByEmail =  (email) => User.findOne({ email });

module.exports = {create, findByEmail};