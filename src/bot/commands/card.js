import * as axios from 'axios'

const MashapeKey = process.env.MASHAPE_API_KEY

module.exports = {
  command: 'card',
  handler(event, cardName, options) {
    let collectible = options.a ? '' : '?collectible=1'

    axios.get(`https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/${cardName}${collectible}`, {
      headers: {
        'X-Mashape-Key': MashapeKey,
      },
    }).then((response) => {
      let cards = response.data

      response.data.forEach((item) => {
        event.message.channel.sendMessage(options.gold ? item.imgGold : item.img)
      })
    }).catch((error) => {
      if (error.status === 404) return event.message.channel.sendMessage('I could not find any cards with that name')
      console.error('Card Command Error:', error)
      return event.message.channel.sendMessage('Sorry, I had a freak out getting that card')
    })
  }
}