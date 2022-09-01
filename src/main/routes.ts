import { Express, Router } from 'express'
import { readdirSync } from 'fs'

export const setupRoutes = (app: Express) => {
  const router = Router()
  app.use('/api', router)

  // read all files from the routes directory and imports them
  readdirSync(`${__dirname}/routes`).map(async fileName => {
    (await import(`./routes/${fileName}`)).default(router)
  })
}
