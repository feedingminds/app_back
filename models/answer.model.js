const { Schema, model } = require('mongoose')

const AnswerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  uid: {
    type: Number,
  }
})

const Answer = model('Answer', AnswerSchema)

module.exports = Answer
