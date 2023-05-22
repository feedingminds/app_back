const Question = require('../models/question.model')
const Answer = require('../models/answer.model')

const { Types } = require('mongoose')

const getQuestions = async (req, res) => {
  // await Question.remove();
  const questions = await getQuestionChilds(
   null, null
  )
  // const questions = await getChilds('646a3e1619de583be98d6284','646a3e1619de583be98d6282');

  res.status(200).json({
    ok: true,
    message: 'success',
    questions,
  })
}

const getQuestionChilds = async (idQuestion, idAnswer, qtyAnswers) => {
  let data = []

  if (qtyAnswers == 0) {
    return data
  } else {
    let question = await getChilds(idQuestion, idAnswer)
    let questionCopy = { ...question }
    if (questionCopy._doc) {
      questionCopy = { ...questionCopy._doc, ans: [] }
      // console.log('as', questionCopy);

      for (let index = 0; index < questionCopy.answers.length; index++) {
        const element = questionCopy.answers[index]
        questionCopy.ans[index] = await getQuestionChilds(question.id, element, questionCopy.answers.length)
        // console.log('hola', question.id);
      }
    }

    // console.log('ar', questionCopy)
    return questionCopy
  }
}

const getChilds = async (idQuestion, idAnswer) => {
  const question = await Question.findOne({
    parent_answer: idAnswer,
    parent_question: idQuestion,
  }).populate('answers', ['name'])
  return question
}

const storeQuestion = (req, res) => {
  const body = req.body

  try {
    let arrayAnswers = []
    for (let index = 0; index < body.answers.length; index++) {
      const element = body.answers[index]
      //   console.log('ele', element);
      const newAnswer = new Answer({ ...element })
      newAnswer.save()
      arrayAnswers.push(newAnswer._id)
    }

    const questionNew = new Question({
      ...body,
      answers: arrayAnswers,
      parent_question: body.parent_question
        ? Types.ObjectId(body.parent_question)
        : null,
      parent_answer: body.parent_answer
        ? Types.ObjectId(body.parent_answer)
        : null,
    })
    questionNew.save()
    res.status(200).json({
      ok: true,
      message: 'success',
      questionNew,
    })
  } catch (error) {
    console.log('error', error)
  }
}

const seederQuestion = (req, res) => {
  const questions = [
    {
      uid: 1,
      texts: [
        {
          name: 'Mi objetivo es ayudarte a encontrar al psicólogo más adecuado para ti, para que pueda trabajar contigo en aquello que te preocupa',
          type: 'before',
        },
        {
          name: '¿Quieres que te explique cómo funciona TherapyChat?',
          type: 'before',
        },
      ],
      type: 'multiple',
      answers: [
        {
          uid: 1,
          name: 'Sí. ¡Adelante!',
        },
        {
          uid: 2,
          name: 'No, ya conozco el servicio',
        },
      ],
    },
  ]
}

module.exports = {
  storeQuestion,
  getQuestions,
}
