module.exports = {
  command: 'ping',
  handler(event, parameter, options) {
    event.message.channel.sendMessage('Pong!')
  }
}