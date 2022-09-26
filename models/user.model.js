const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  photoURL: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: 'STUDENT_ROLE',
    enum: ['MENTOR_ROLE', 'STUDENT_ROLE'],
  },
})

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject()
  return user
}

module.exports = model('User', UserSchema)
