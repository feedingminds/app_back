const { request, response } = require('express')
const User = require('../models/user.model')
const bcryptjs = require('bcryptjs')

const getUsers = async (req = request, res = response) => {
  const {
    limit = 5,
    from = 0,
    role = ['MENTOR_ROLE', 'STUDENT_ROLE'],
  } = req.query
  const query = {
    role,
  }

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query),
    //* GET USERS WITH PAGINATED
    // User.find(query).skip(Number(from)).limit(Number(limit)),
  ])
  res.json({
    users,
    total,
  })
}

const getUser = async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  res.json(user)
}

const postUsers = async (req, res = response) => {
  const { name, email, password, role } = req.body

  const user = new User({
    name,
    email,
    password,
    role,
  })

  const salt = bcryptjs.genSaltSync()
  user.password = bcryptjs.hashSync(password, salt)

  await user.save()

  res.status(201).json(user)
}

const patchUsers = async (req, res = response) => {
  const { id } = req.params
  const { _id, password, email, ...rest } = req.body
  if (password) {
    const salt = bcryptjs.genSaltSync()
    rest.password = bcryptjs.hashSync(password, salt)
  }
  const options = {
    returnDocument: 'after',
  }
  const user = await User.findByIdAndUpdate(id, rest, options)
  res.json(user)
}

module.exports = {
  getUsers,
  postUsers,
  patchUsers,
  getUser,
}
