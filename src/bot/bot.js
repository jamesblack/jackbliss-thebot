import Discordie from 'discordie'
import {handleCommand, loadCommands} from './commands/_dispatcher'

const Events = Discordie.Events
const client = new Discordie()

client.connect({
  email: process.env.LOGIN_EMAIL,
  password: process.env.LOGIN_PASSWORD,
})

client.Dispatcher.on(Events.DISCONNECTED, (e) => {
  console.error('Error attempting to connect:', e)
})

client.Dispatcher.on(Events.GATEWAY_READY, (e) => {
  console.info('Connected as:', client.User.username)
})

loadCommands().then((loaded) => {
  console.info(`Loaded ${loaded} commands`)

  client.Dispatcher.on(Events.MESSAGE_CREATE, (e) => {
    let message = e.message.content.trim().toLowerCase()
    if (message[0] !== '!') return

    let plainMessage = message.substring(1)

    handleCommand(e, ...plainMessage.split(' '))
  })
})

export function handleHook() {
  console.log('Someone called handleHook which is not implemented yet')
}