import CityModel from '../models/Others/City.model.js'
import cities from '../data/colombianCities.json' assert { type: 'json' } 

const createCities = async () => {
    let existsCity
    try {
        existsCity = await CityModel.countDocuments()
        console.log('existsCity:', existsCity)
    } catch (error) {
        console.error('Error finding city:', error)
    }

    if (existsCity) return

    cities.forEach(async (city) => {
        try {
            await CityModel({...city, country: '662ae86b65db9edbf76b3e65'}).save()
            return
        } catch (error) {
            console.error('Error creating city:', error)
            return null
        }
    })
}

export default createCities