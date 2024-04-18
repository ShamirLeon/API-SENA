import UserModel from '../models/User/User.model.js'

const validateUserById = async (id) => {
  const user = await UserModel.findById(id)
  if (!user) {
    throw new Error('User not found')
  }
}

const validateUserByEmail = async (email) => {
  const user = await UserModel.findOne({ email })
  if (user) {
    throw new Error('User already exists with this email')
  }
}

export {
  validateUserByEmail,
  validateUserById
}
