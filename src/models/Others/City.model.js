import mongoose from 'mongoose'

const { Schema, model } = mongoose

const CitySchema = new Schema(
  {
    region: {
      type: String,
      required: true
    },
    departmentDaneCode: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    municipalityDaneCode: {
      type: String,
      required: true
    },
    municipality: {
      type: String,
      required: true
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: 'country'
    }
  },
  { timestamps: true }
)

export default model('city', CitySchema)
