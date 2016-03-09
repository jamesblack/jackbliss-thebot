import startBot, { handleHook } from './bot/bot'
import { startServer } from './server/server'
import mongooseConnect from './lib/mongoose'


mongooseConnect().then(() => {
  startServer(handleHook)
  startBot()
})