import express from 'express'
import { validateUserByEmail } from '../helpers/user.helper.js'
import { check } from 'express-validator'
import validateData from '../middlewares/validateData.js'
import userController from '../controllers/User/User.controller.js'
import { upload } from '../middlewares/user.js'

const router = express.Router()

const { login, usuarioGetById, usuarioPost, updateAvatar } = userController

router.post('/', [
  // middlewares
  check('email').custom(validateUserByEmail),
  validateData
], usuarioPost)

router.get('/:id', usuarioGetById)

router.post('/login', login)

router.post('/avatar', upload.single('avatar'), updateAvatar)

export default router
