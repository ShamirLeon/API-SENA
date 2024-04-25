import express from 'express'
import path from 'node:path'
import connectDB from '../../db.js'
import apiRoutes from '../routes/index.js'
import createPermissions from '../initialConfig/createPermissions.js'
import createRoles from '../initialConfig/createRoles.js'
import createCountry from '../initialConfig/createCountry.js'
import createCities from '../initialConfig/createCities.js'
class server {
  constructor () {
    this.port = process.env.PORT || 3000
    this.app = express()
    this.dbConnection()
    this.middlewares()
    this.routes()
    createPermissions()
    createRoles()
    createCountry()
    createCities()
  }

  routes () {
    this.app.use('/api', apiRoutes)
  }

  middlewares () {
    const __dirname = path.resolve(path.dirname(''), '../node/uploads')
    this.app.use(express.json())
    this.app.use(express.static(path.join(__dirname, 'avatars')))
  }

  async dbConnection () {
    await connectDB()
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port http:://localhost:${this.port}`)
    })
  }
}

export default server
