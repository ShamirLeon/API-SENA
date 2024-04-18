import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const router = express.Router()
const folderName = fileURLToPath(import.meta.url)
const pathRouter = path.dirname(folderName)

const removeExtension = (fileName) => fileName.split('.').shift()

fs.readdirSync(pathRouter).filter(async (file) => {
  const fileWithoutExtension = removeExtension(file)
  if (fileWithoutExtension !== 'index') {
    const route = await import(`./${fileWithoutExtension}.routes.js`)
    router.use(`/${fileWithoutExtension}`, route.default)
    console.log('Routes loaded: ', fileWithoutExtension)
  }
})

export default router
