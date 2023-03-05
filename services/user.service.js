const User = require('../models/user.model')

const userById = async (id) => {
  return await User.findById(id);
}

module.exports = {
  userById,
}
