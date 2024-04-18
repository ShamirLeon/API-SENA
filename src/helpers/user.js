import User from '../models/User/User.model'

const existsUserById = async (id) => {
  const user = await User.findById(id)
  if (!user) {
    throw new Error('User not found')
  }
}

export {
  existsUserById
}
