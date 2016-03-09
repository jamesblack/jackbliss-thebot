let data = {

}

export function startPlayedGatherer(client) {
  setInterval(() => {
    let servers = client.servers
    servers.forEach((server) => {
      if (!data[server.id]) data[server.id] = {}
      server.members.forEach((member) => {
        if (member.game === null) return

        if (!data[server.id][member.game.name]) data[server.id][member.game.name] = 0
        data[server.id][member.game.name] += 1
      })
    })

    console.log(data)
  }, 1000)
}