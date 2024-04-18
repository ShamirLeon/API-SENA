import mongoose from 'mongoose'

const { Schema, model } = mongoose

const RoleSchema = new Schema({
  name: String,
  displayName: String,
  description: String,
  permissions: [{ type: Schema.Types.ObjectId, ref: 'permissions' }]
},
{ timestamps: true }
)

export default model('roles', RoleSchema)
