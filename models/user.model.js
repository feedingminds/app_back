const { Schema, model } = require('mongoose')
const { average } = require('../helpers/average')

const CommentSchema = new Schema({
  content: {
    type: String,
    default: '',
  },
  rating: {
    type: Number,
    default: 0,
  },
  author: {
    type: String,
    default: '',
  },
})

const ReservedTimesSchema = new Schema({
  timestamp: {
    type: Number,
  },
  hour: {
    type: String,
  },
  // mentor_id: UserSchema,
  order_id: String,
  amount: Number,
})

const UserSchema = new Schema(
  {
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
    rating: {
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
    },
    comments: [CommentSchema],
    students: {
      type: Number,
      default: 0,
    },
    schedule: {
      hours: [
        {
          type: String,
        },
      ],
      days: [
        {
          type: Number,
        },
      ],
      duration: {
        type: String,
        default: '',
      },
    },
    meet: {
      type: String,
      default: '',
    },
    reservedTimes: [ReservedTimesSchema],
    status: {
      type: String,
      required: true,
      default: 'PENDIENTE',
      enum: ['PENDIENTE', 'ACTIVO', 'INACTIVO', 'CANCELADO'],
    },
    plans: [
      {
        name: {
          type: String,
        },
        price: {
          type: Number,
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
  }
)

UserSchema.virtual('average').get(function () {
  return average([
    this.rating[1],
    this.rating[2],
    this.rating[3],
    this.rating[4],
    this.rating[5],
  ])
})

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject({ virtuals: true })
  return {
    id: _id,
    ...user,
  }
}

UserSchema.post('save', async function (user, next) {
  if (user.role == 'MENTOR_ROLE') {
    await User.findOneAndUpdate(
      { _id: user._id },
      {
        plans: [
          {
            name: 'Básico 1',
            price: 50,
          },
        ],
      },
      { new: true }
    )
  }

  next()
})

const User = model('User', UserSchema)

module.exports = User
