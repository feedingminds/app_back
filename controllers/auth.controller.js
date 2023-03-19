const { response } = require('express')
const User = require('../models/user.model')
const bcryptjs = require('bcryptjs')

const { generateJWT } = require('../helpers/generateJWT')

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
    const refreshToken= generateJWT(user.id, process.env.JWT_KEY_REFRESH)

    res.status(200).json({
      ok: true,
      data: "Welcome!",
      token: token,
      refreshToken: refreshToken ,
    });


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

  res.status(201).json(user)
}

const refreshToken= async (req, res = response) => {
  const refreshToken= req.headers.refresh

  if (!refreshToken){
    res.status(400).json({message: "Something goes wrong"})
  }

  let user
  try {
    const { uid } = jwt.verify(refreshToken, process.env.JWT_KEY_REFRESH)
    user = await User.findById(uid)
    
  }catch (err) {
    return res.status(400).json({message: err.message})
  }

  const token = generateJWT(user.id, process.env.JWT_KEY);

  res.json({message:"OK", token})

}

module.exports = {
  login,
  register,
  refreshToken,
}
