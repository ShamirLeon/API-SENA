import CountryModel from '../models/Others/Country.model.js'
import countries from '../data/countries.json' assert { type: 'json' }

const createCountry = async () => {
  let existsCountry
  try {
    existsCountry = await CountryModel.countDocuments()
    console.log('existsCountry:', existsCountry)
  } catch (error) {
    console.error('Error finding country:', error)
  }

  if (existsCountry) return

  countries.forEach(async (country) => {
    try {
        await CountryModel(country).save()
        return
    } catch (error) {
      console.error('Error creating country:', error)
      return null
    }
  })
}

export default createCountry
