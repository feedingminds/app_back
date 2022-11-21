const mongoose = require('mongoose')
require('dotenv').config()

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { ignoreUndefined: true })
    console.log('Database online.')
  } catch (error) {
    console.log(error)
    throw new Error('Error when starting the database.')
  }
}

module.exports = {
  connect,
}
