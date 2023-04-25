const jwt = require('jsonwebtoken')

// const generateJWT = (uid = '', secretKey) => {
//   return new Promise((resolve, reject) => {
//     const payload = { uid }
//     jwt.sign(
//       payload,
//       secretKey,
//       {
//         expiresIn: '4h',
//       },
//       (err, token) => {
//         if (err) {
//           console.error(err)
//           reject('Token was not generate')
//         } else {
//           resolve(token)
//         }
//       }
//     )
//   })
// }

const generateJWT = (uid, secretKey) => {
  return jwt.sign({ uid }, secretKey, { expiresIn: '5h' })
}

const generateRefreshToken = (uid, secretKey) => {
  return jwt.sign({ uid }, secretKey, { expiresIn: '30d' })
}

module.exports = {
  generateJWT,
  generateRefreshToken,
}
