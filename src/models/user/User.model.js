import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const { Schema, model } = mongoose

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  emailVerified: Boolean,
  status: {
    type: Number,
    default: 1
  },
  role: [{ type: Schema.Types.ObjectId, ref: 'roles' }]
})

UserSchema.statics.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  await bcrypt.hash(password, salt)
}

UserSchema.statics.comparePassword = async (password, receivedPassword) => {
  await bcrypt.compare(password, receivedPassword)
}

export default model('users', UserSchema)
