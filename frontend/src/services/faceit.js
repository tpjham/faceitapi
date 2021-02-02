import axios from "axios"
const baseUrl = "/api/faceit"

const getPlayerInfo = (nick) => {
  const request = axios.get(`${baseUrl}/${nick}`, {
    params: {
      player: nick
    }
  })
  return request.then(response => response.data)
}

const getMatchInfo = (player, playerId) => {
  const request = axios.get(`${baseUrl}/${player}/matches`, {
    params: {
      player: player,
      playerId: playerId
    }
  })
  const result = request.then(response => response.data)
  return result
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getPlayerInfo, getMatchInfo }