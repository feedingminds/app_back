const User = require('../models/user.model')

const existsEmail = async (email = '') => {
  const existsEmail = await User.findOne({ email })
  if (existsEmail) {
    throw new Error('Email is already registered')
  }
}

const existsUserById = async (id) => {
  const user = await User.findById(id)
  if (!user) {
    throw new Error('ID does not exist' + id)
  }
}

module.exports = {
  existsEmail,
  existsUserById,
}
