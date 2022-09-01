import express from 'express'
import { setupRoutes } from './routes'

const app = express()

app.use(express.json())

setupRoutes(app)

const port = 3333
app.listen(port, () => console.log(`Listening on port ${port}...`))
