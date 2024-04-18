import mongoose from 'mongoose'

const { Schema } = mongoose

const PermissionSchema = new Schema({
  is_menu: Number,
  icon: String,
  name: String
},
{ timestamps: true }
)

export default mongoose.model('permissions', PermissionSchema)
