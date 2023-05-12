const mongoose = require('mongoose')
require('dotenv').config()

const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONDO_DB}`,
      { ignoreUndefined: true }
    )
    console.log('Database online.')
  } catch (error) {
    console.log(error)
    throw new Error('Error when starting the database.')
  }
}

module.exports = {
  connect,
}
