import express from 'express'
import { validateUserByEmail } from '../helpers/user.helper.js'
import { check } from 'express-validator'
import validateData from '../middlewares/validateData.js'
import userController from '../controllers/User/User.controller.js'

const router = express.Router()

router.post('/', [
  // middlewares
  check('email').custom(validateUserByEmail),
  validateData
], userController.usuarioPost)

router.get('/:id', userController.usuarioGetById)

router.post('/login', userController.login)

export default router
