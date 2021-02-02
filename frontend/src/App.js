import React, { useEffect, useState } from "react"
import apiService from "./services/faceit"
import Stats from "./components/Stats"
import './App.css';

const App = () => {
  const [ level, setLevel ] = useState(`FACEIT LEVEL COMES HERE`)
  const [ matches, setMatches ] = useState({})
  const [ nick, setNick ] = useState("")
  const [ player_Id, setId ] = useState("")
  const [ hidden, setHidden ] = useState(false)

  const hideWhenPressed = { display: hidden ? "none" : "" }

  const findInfoManually = async () => {
    console.log(nick);
    await apiService
      .getPlayerInfo(nick)
      .then(result => {
        setId(result.playerId)
        setLevel(result.level)
        getMatchInfo(player_Id)
      })
  }

  setInterval( () => {
    if ( nick !== "" ) {
      setNick(nick)
    }
  }, 120000)

  useEffect( () => {
    if ( window.location.pathname !== "/search/" ) {
      setNick(window.location.pathname.substring(8))
      setHidden(true)
      findInfoManually()
      
    }
  }, [nick, player_Id])

  const findInfo = async (event) => {
    event.preventDefault()
    await apiService
      .getPlayerInfo(nick)
      .then(result => {
        setId(result.playerId)
        setLevel(result.level)
        getMatchInfo(player_Id)
      })
  }

  const getMatchInfo = async (playerId) => {
    await apiService
      .getMatchInfo(nick, playerId)
      .then(result => {
        setMatches(result)
      })

  }

  const handleNickChange = (event) => {
    setNick(event.target.value)
  }

  const hideForm = (event) => {
    event.preventDefault()
    setHidden(!hidden)
  }

  return (
    <div className="App">
        <form onSubmit={findInfo} id="search" style={hideWhenPressed}>
          <input
            id="nick"
            value={nick}
            onChange={handleNickChange}
          />
          <button id="submit-button" type="submit">Find</button>
          <button onClick={hideForm}>Hide search bar</button>
        </form>
        <Stats level={level} matches={matches}/>
    </div>
  );
}

export default App;
