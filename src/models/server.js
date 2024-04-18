import express from 'express'
import connectDB from '../../db.js'
import apiRoutes from '../routes/index.js'
import createPermissions from '../helpers/createPermissions.js'
import createRoles from '../helpers/createRoles.js'

class server {
  constructor () {
    this.port = process.env.PORT || 3000
    this.app = express()
    this.dbConnection()
    this.middlewares()
    this.routes()
    createPermissions()
    createRoles()
  }

  routes () {
    this.app.use('/api', apiRoutes)
  }

  middlewares () {
    this.app.use(express.json())
  }

  async dbConnection () {
    await connectDB()
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`)
    })
  }
}

export default server
