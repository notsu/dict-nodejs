import {} from 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import { middleware } from '@line/bot-sdk'
import config from 'dict/config/channels'
import webhook from 'dict/webhooks'
import errorHandler from 'dict/webhooks/errors'

const app = express()
const port = parseInt(process.env.PORT, 10) || 3000

app.use(helmet())

app.use('/webhook', middleware(config.bot), webhook)
app.use('/webhook', errorHandler)

app.listen(port)