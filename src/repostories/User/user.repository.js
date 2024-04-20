import UserModel from '../../models/User/User.model.js'
import bcryptjs from 'bcryptjs'
import fs from 'node:fs'

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
  },

  async getByEmail (email) {
    try {
      const user = await UserModel.findOne({ email }).populate({
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

  async updateUserAvatar (id, avatar) {
    try {
      await UserModel.findByIdAndUpdate(id, { avatar })
    } catch (error) {
      return { message: 'Internal server error', error }
    }
  },

  saveImage (file) {
    try {
      const newPath = `uploads/avatars/${file.originalname}`
      fs.renameSync(file.path, newPath)
      return newPath
    } catch (error) {
      console.log(error)
    }
  }

}

export default userRepository
