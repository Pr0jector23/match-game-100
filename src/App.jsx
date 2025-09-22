import {useState} from 'react'

import Cards from "./components/Cards"
import Win from "./components/Win"

function App() {

  const [gameWon, setGameWon] = useState(false)


  const handleWin = () => {
    setGameWon(true)
  }

  return (
    <div className="App">
      <h1>Memory Game</h1>
        {gameWon && <Win />}
        <Cards gameWon={handleWin}></Cards>
    </div>
  )
}

export default App
