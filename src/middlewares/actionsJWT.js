import jwt from 'jsonwebtoken'
import { validateUserById } from '../helpers/user.helper.js'
import defaultCtr from '../helpers/defaultCtr.js'
import User from '../models/User/User.model.js'

const generateToken = (uid) => {
  return new Promise((resolve, reject) => {
    checkToken()
    const payload = { uid }
    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '24h'
    }, (err, token) => {
      if (err) {
        console.log(err)
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('No se pudo generar el token')
      } else {
        resolve(token)
      }
    })
  })
}

const validateToken = async (req, res, next) => {
  const token = req.header('token')
  if (!token) {
    return defaultCtr.error(res, 401, 'No token provided')
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(uid)

    if (!user) {
      return defaultCtr.error(res, 401, 'Invalid token')
    }

    if (!user.status) {
      return defaultCtr.error(res, 401, 'User is disabled')
    }

    req.user = user
    next()
  } catch (error) {
    return defaultCtr.error(res, 401, 'Invalid token')
  }
}

async function checkToken (token) {
  let __id = null
  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET)
    __id = _id
  } catch (error) {
    return false
  }

  // eslint-disable-next-line no-unused-vars
  const user = await validateUserById(__id)
}

export {
  generateToken,
  validateToken
}
