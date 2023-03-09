const express = require('express')
const { check } = require('express-validator')
const {
  getUsers,
  postUsers,
  patchUsers,
  getUser,
} = require('../controllers/user.controller')
const { existsUserById, existsEmail } = require('../helpers/db-validators')
const { validateFields } = require('../middlewares')

const { validateJWT } = require('../middlewares/validate-jwt')

const router = express.Router()

router.get('/', validateJWT, getUsers)

router.get(
  '/:id',
  [
    check('id', "It's not ID valid").isMongoId(),
    check('id').custom(existsUserById),
    validateFields,
    
  ],
  getUser
)

router.patch(
  '/:id',
  [
    check('id', "It's not ID valid").isMongoId(),
    check('id').custom(existsUserById),
    validateFields,
  ],
  patchUsers
)

router.post(
  '/',
  [
    check('name', 'Name is required'),
    check('password', 'Password must have more than six letters').isLength({
      min: 6,
    }),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(existsEmail),
    validateFields,
  ],
  postUsers
)

module.exports = router
