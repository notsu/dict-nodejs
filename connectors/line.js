import { Client } from '@line/bot-sdk'
import config from 'dict/config/channels'

export default new Client(config.bot)