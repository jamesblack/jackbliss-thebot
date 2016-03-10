import Discord from 'discord.js'
import {handleCommand, loadCommands} from './commands/_dispatcher'
import { startPlayedGatherer } from './internals/play-time-gatherer'

const client = new Discord.Client()

export default function startBot() {
  client.login(process.env.LOGIN_EMAIL, process.env.LOGIN_PASSWORD)
    .then((result) => {
      console.log('Logged in:', result)
      startPlayedGatherer(client)
        .catch((error) => {
          console.log(error)
        })
    })
    .catch((error) => {
      console.error('Unable to Login:', error)
    })
}
client.on('disconnected', (e) => {
  console.error('Disconnected:', e)
})

client.on('error', (e) => {
  console.error('Error attempting to connect:', e)
})

client.on('debug', (message) => {
  console.info('DEBUG:', message)
})

client.on('ready', () => {
  console.info('Connected as:', client.user.username)
})

loadCommands().then((loaded) => {
  console.info(`Loaded ${loaded} commands`)

  client.on('message', (event) => {
    let message = event.content.trim().toLowerCase()
    if (message[0] !== '!') return

    let plainMessage = message.substring(1)

    handleCommand(event, ...plainMessage.split(' '))
  })
})

export function handleHook() {
  console.log('Someone called handleHook which is not implemented yet')
}
