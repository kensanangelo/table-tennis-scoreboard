import React, { useState } from 'react';
import './styles/App.scss';
import Clock from './components/Clock/Clock';
import Setup from './components/Setup/Setup';
import Scoreboard from './components/Scoreboard/Scoreboard';
import Background from './img/bg.jpg'

function App() {
  // Sets up game state and players so it can be passed down 
  // into the scoreboard after setup

  //* Gamestate can be:
		//* setup
		//* playing
		//* overtime
    //* gameover
    
  //* Game mode can be:
		//* standard
    //* practice
    
  const initialState = {
    gameMode: 'standard',
    gameState: 'setup',
    players: {
      home: {
        id: '',
        name: 'Home',
        isServing: true
      },
      away: {
        id: '',
        name: 'Away',
        isServing: false
      }
    }
  }

  const [state, setState] = useState(initialState);
  

  return (
    <div className={state.gameState === 'setup' ? 'App App--setup' : 'App'}>
      <img className="App__bg" src={Background} alt="Background gradient"/>
      <div className="App__container">
        <Clock />
        {state.gameState === 'setup' ? 
          <Setup startGame={p=>{setState(p)}} />
        :
          <Scoreboard 
            players={state.players} 
            gameMode={state.gameMode} 
            setNewGame={()=>{setState(initialState)}}/>
        }
      </div>
    </div>
  );
}

export default App;
