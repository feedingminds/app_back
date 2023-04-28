const { response, request } = require('express')
const User = require('../models/user.model')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { generateJWT, generateRefreshToken } = require('../helpers/generateJWT')

const login = async (req, res = response) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        message: "Email doesn't exists",
      })
    }

    const isValidPassword = bcryptjs.compareSync(password, user.password)
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Password isn't correct",
      })
    }

    //res.json(user)

    const token = generateJWT(user.id, process.env.JWT_KEY)
    const refreshToken = generateRefreshToken(
      user.id,
      process.env.JWT_KEY_REFRESH
    )

    res.status(200).json({
      ok: true,
      data: user,
      token: token,
      refreshToken: refreshToken,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Contact with your developer',
    })
  }
}

const register = async (req, res = response) => {
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

  const token = generateJWT(user.id, process.env.JWT_KEY)
  const refreshToken = generateRefreshToken(
    user.id,
    process.env.JWT_KEY_REFRESH
  )

  res.status(201).json({
    ok: true,
    data: user,
    token: token,
    refreshToken: refreshToken,
  })
}

const refreshToken = async (req = request, res = response) => {
  //const refreshToken = req.headers.refresh
  const refreshToken = req.header('x-token')
  console.log(refreshToken)
  if (!refreshToken) {
    res.status(400).json({ message: 'Something goes wrong' })
  }

  let user
  try {
    const { uid } = jwt.verify(refreshToken, process.env.JWT_KEY_REFRESH)
    console.log('llegó uid')
    user = await User.findById(uid)
    console.log('user:', user)
  } catch (err) {
    //return res.status(400).json({ message: err.message })
    console.log({ message: err.message })
  }

  const token = generateJWT(user.id, process.env.JWT_KEY)

  res.json({ ok: true, data: user, token })
}

module.exports = {
  login,
  register,
  refreshToken,
}
