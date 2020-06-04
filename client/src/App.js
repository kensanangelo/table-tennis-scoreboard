import React, { useState } from 'react';
import './styles/App.scss';
import Clock from './components/Clock/Clock';
import Setup from './components/Setup/Setup';
import Scoreboard from './components/Scoreboard/Scoreboard';

function App() {
  // Sets up game state and players so it can be passed down 
  // into the scoreboard after setup

  //* Gamestate can be:
		//* setup
		//* playing
		//* overtime
		//* gameover
  const initialState = {
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
    <div className="App">
      <Clock />
      {state.gameState === 'setup' ? 
        <Setup changeGamestate={p=>{setState(p)}} />
      :
        <Scoreboard players={state.players}/>
      }
    </div>
  );
}

export default App;
