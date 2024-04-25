import mongoose from 'mongoose'

const { Schema, model } = mongoose

const ThirdPartySchema = new Schema({
  firstName: String,
  lastName: String,
  fullName: String,
  email: String,
  typeIdentification: {
    type: Schema.Types.ObjectId,
    ref: 'coreMaster'
  },
  numberIdentification: String,
  gender: {
    type: Schema.Types.ObjectId,
    ref: 'coreMaster'
  },
  maritalStatus: {
    type: Schema.Types.ObjectId,
    ref: 'coreMaster'
  },
  phone: String,
  cellphone: String,
  stratum: Number,
  country: {
    type: Schema.Types.ObjectId,
    ref: 'country'
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: 'city'
  },
  address: String

},
{ timestamps: true }
)

export default model('thirdparty', ThirdPartySchema)
