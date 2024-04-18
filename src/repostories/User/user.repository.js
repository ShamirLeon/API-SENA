import UserModel from '../../models/User/User.model.js'
import bcryptjs from 'bcryptjs'

const userRepository = {
  async getById (id) {
    try {
      const user = await UserModel.findById(id).populate({
        path: 'role',
        populate: {
          path: 'permissions',
          model: 'permissions'
        }
      })
      return user
    } catch (error) {
      return { message: 'Internal server error', error }
    }
  },

  async createUser ({ username, password, email, emailVerified, role }) {
    try {
      const newUser = new UserModel({ username, password, email, emailVerified, role })

      /* encrypt user password */
      const salt = await bcryptjs.genSalt(10)
      newUser.password = await bcryptjs.hash(password, salt)

      /* save user */
      await newUser.save()
    } catch (error) {
      return { message: 'Internal server error', error }
    }
  }
}

export default userRepository
