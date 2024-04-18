import User from '../../models/User/User.model.js'
import defaultCtr from '../../helpers/defaultCtr.js'
import userRepository from '../../repostories/User/user.repository.js'

const userController = {

  /* Get User By ID */
  usuarioGetById: async (req, res) => {
    const { id } = req.params
    try {
      const user = await userRepository.getById(id)
      if (!user) return defaultCtr.error(res, 404, 'User not found')
      return defaultCtr.response(res, 200, 'User found', user)
    } catch (error) {
      console.log(error)
      return defaultCtr.error(res, 500, 'Internal server error', error)
    }
  },

  /* Post User */
  usuarioPost: async (req, res) => {
    try {
      await userRepository.createUser(req.body)

      /* response */
      return defaultCtr.response(res, 200, 'User created successfully')
    } catch (error) {
      console.log(error)
      return defaultCtr.error(res, 500, 'Internal server error', error)
    }
  }
}

export default userController
