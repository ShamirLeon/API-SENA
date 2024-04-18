import UserModel from '../models/User/User.model.js'

const validateUserByEmail = async (email) => {
  const user = await UserModel.findOne({ email })
  if (user) {
    throw new Error('User already exists with this email')
  }
}

export {
  validateUserByEmail
}
