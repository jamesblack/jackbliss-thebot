import Server from '../../models/server'
import { find, findIndex, isNumber } from 'lodash'

const timeToCheck = 4000

export async function startPlayedGatherer(client) {
  try {
    let servers = await Server.find()

    console.log(servers)

    setInterval(async () => {
      try {
        client.servers.forEach(async (discordServer) => {
          try {
            let server = find(servers, ['id', discordServer.id])
            if (!server) server = new Server({_id: discordServer.id})
            console.log('Found Server')
            discordServer.members.forEach((member) => {
              try {
                if (member.game === null) return

                  let gameIndex = findIndex(server.played, [ 'name', member.game.name ])

                  if (gameIndex === -1) {
                    gameIndex = server.played.push({
                      name: member.game.name,
                      players: []
                    }) - 1
                  }

                  let playerIndex = findIndex(server.played[gameIndex].players, [ 'id', member.id ])

                  if (playerIndex === -1) {
                    playerIndex = server.played[gameIndex].players.push({
                      id: member.id,
                      played: 0
                    }) - 1
                  }

                  server.played[gameIndex].players[playerIndex].played = server.played[gameIndex].players[playerIndex].played + (timeToCheck / 1000)
              } catch (exception) {
                console.error('what the fuckin:', exception)
              }

            })

            await server.save()
          } catch (exception) {
            console.error('what the hell', error)
          }
        })
      } catch (exception) {
        console.error('exception in discordServer', error)
      }
    }, timeToCheck)
  } catch (exception) {
    console.error(exception)
  }
  // setInterval(() => {
  //   let servers = client.servers
  //   servers.forEach((server) => {
  //     if (!data[server.id]) data[server.id] = {}
  //     server.members.forEach((member) => {
  //       if (member.game === null) return

  //       if (!data[server.id][member.game.name]) data[server.id][member.game.name] = 0
  //       data[server.id][member.game.name] += 60
  //     })
  //   })
  //   console.log(data)
  // }, 60000)
}