const { Schema, model } = require('mongoose')

const QuestionSchema = new Schema(
  {
    texts: [
      {
        name: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
          default: 'before',
          enum: ['before', 'after'],
        },
      },
    ],
    type: {
      type: String,
      required: true,
      default: 'multiple',
      enum: ['multiple', 'text'],
    },
    uid: {
      type: Number,
    },
    parent_question_uid: {
      type: Number,
      required: false
    },
    parent_answer_uid: {
      type: Number,
      required: false
    },
    parent_question: {
      type: Schema.Types.ObjectId, ref: 'Question',
      required: false,
    },
    parent_answer: {
      type: Schema.Types.ObjectId, ref: 'Answer',
      required: false,
    },
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  },
  {
    toJSON: { virtuals: true },
  }
)

const Question = model('Question', QuestionSchema)

module.exports = Question
