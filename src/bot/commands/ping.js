module.exports = {
  command: 'ping',
  handler(event, parameter, options) {
    event.client.reply(event, 'Pong!')
  }
}