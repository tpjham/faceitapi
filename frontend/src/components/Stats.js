import React from "react"

const Stats = ({level, matches}) => {
  return (
    <div className="stats">
    <div id="level">
      {level}
    </div>
    <div id="matches">
      <div>Winrate: {matches.winrate}%</div>
      <div>Wins: {matches.wins}</div>
      <div>Losses: {matches.losses}</div>
    </div>
  </div>
  )
}

export default Stats