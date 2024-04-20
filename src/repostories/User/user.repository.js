import fs from 'node:fs'
import path from 'node:path'
import bcryptjs from 'bcryptjs'
import UserModel from '../../models/User/User.model.js'

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

  async saveImage (userID, file) {
    try {
      const newPath = `uploads/avatars/${file.originalname}`
      const __dirname = path.resolve(path.dirname(''), '../node/uploads/avatars')
      const user = await UserModel.findById(userID)

      /* Delete the old avatar */
      if (user.avatar) {
        const avatarPath = path.join(__dirname, user.avatar)
        fs.unlinkSync(avatarPath)
      }

      /* Rename and replace the file in the fs */
      fs.rename(file.path, newPath, (err) => {
        if (err) throw err
      })

      /* Update user avatar */
      await this.updateUserAvatar(userID, file.originalname)

      return newPath
    } catch (error) {
      console.log(error)
    }
  }

}

export default userRepository
