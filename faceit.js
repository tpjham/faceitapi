const faceitRouter = require("express").Router()
const config = require("./config")
const axios = require("axios")

const API_KEY = config.API_KEY

let playerId = ""

faceitRouter.get(`/`, (req, res) => {
})

faceitRouter.post('/', (request, response) => {
  return response.status(400).json({
    error: "No adding allowed"
  })
})

faceitRouter.get('/:player', async (req, res) => {
  const authHeader = {
    headers: { Authorization: `Bearer ${API_KEY}`}
  }
  const result = await axios.get(`https://open.faceit.com/data/v4/players?nickname=${req.params.player}`, authHeader)
    .catch(err => res.send(err))

  playerId = result.data.player_id
  const playerInfo = result.data
  res.send({
    playerId: playerId,
    level: `FACEIT level: ${playerInfo.games.csgo.skill_level}, elo: ${playerInfo.games.csgo.faceit_elo}`
  })
})

faceitRouter.get('/:player/matches', async (req, res) => {
  const authHeader = {
    headers: { Authorization: `Bearer ${API_KEY}`}
  }
  console.log(req.query.playerId);
  playerId = req.query.playerId
  const result = await axios.get(`https://open.faceit.com/data/v4/players/${playerId}/history?game=csgo&offset=0&limit=10`, authHeader)
    .catch(err => res.send(err.message))
  if (result.data) {
    const matchTotal = getMatchesTotal(req.query.player, result.data.items)
    res.send(matchTotal)
  }
})

const getMatchesTotal = (nick, matchInfo) => {
  let winRate = 0.0;
  let wins = 0;
  for (const match of matchInfo) {
    let tempWinner = match.results.winner
    for (const player of match.teams[tempWinner].players) {
      if ( player.nickname === nick ) {
        wins++
      }
    }
  }
  winRate = ((matchInfo.length - (matchInfo.length - wins)) / matchInfo.length) * 100
  return {winrate: winRate, wins: wins, losses: matchInfo.length - wins}
}

module.exports = faceitRouter