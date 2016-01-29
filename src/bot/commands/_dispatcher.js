import minimist from 'minimist'
import { readdir } from 'fs'
import { join } from 'path'

let commands = {}

// Register Command Files
export function loadCommands() {
  return new Promise((resolve, reject) => {
    readdir(__dirname, (err, files) => {
      files.forEach((file) => {
        if (!!~file.indexOf('_dispatcher')) return
        let command = require(join(__dirname, file))
        if (!command.handler || !command.command) return console.error('Invalid Command Found:', command)
        commands[command.command] = command
      })
      resolve(Object.keys(commands).length)
    })

  })
}

export function handleCommand(event, command, ...payload) {
  if (!commands[command]) return console.error('InvalidCommand:', command, ':', JSON.stringify(payload))

  let message = payload.join(' ').trim()
  let optionStartIndex = message.indexOf(' -')
  let parameter = message
  let options = {}

  if (!!~optionStartIndex) {
    parameter = message.substring(0, optionStartIndex).trim()
    options = minimist(message.substring(optionStartIndex).split(' '))
  }

  commands[command].handler(event, parameter, options)
}