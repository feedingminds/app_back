const { Schema, model } = require('mongoose')

const CommentSchema = new Schema({
  content: {
    type: String,
    default: '',
  },
  author: {
    type: String,
    default: '',
  },
})

const RatingSchema = new Schema({
  1: {
    type: Number,
    default: 0,
  },
  2: {
    type: Number,
    default: 0,
  },
  3: {
    type: Number,
    default: 0,
  },
  4: {
    type: Number,
    default: 0,
  },
  5: {
    type: Number,
    default: 0,
  },
  average: {
    type: Number,
    default: 0,
  },
})

const UserSchema = new Schema({
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
  role: {
    type: String,
    required: true,
    default: 'STUDENT_ROLE',
    enum: ['MENTOR_ROLE', 'STUDENT_ROLE'],
  },
  about: {
    type: String,
    default: '',
  },
  career: {
    type: String,
    default: '',
  },
  university: {
    type: String,
    default: '',
  },
  job: {
    type: String,
    default: '',
  },
  experience: {
    type: String,
    default: '',
  },
  nationality: {
    type: String,
    default: '',
  },
  genre: {
    type: String,
    default: '',
  },
  linkedin: {
    type: String,
    default: '',
  },
  photoURL: {
    type: String,
    default: '',
  },
  rating: RatingSchema,
  comments: [CommentSchema],
})

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject()
  return {
    id: _id,
    ...user,
  }
}

module.exports = model('User', UserSchema)
