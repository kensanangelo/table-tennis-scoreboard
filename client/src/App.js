import React, { useState } from 'react';
import './styles/App.scss';
import Clock from './components/Clock/Clock';
import Setup from './components/Setup/Setup';
import Scoreboard from './components/Scoreboard/Scoreboard';

function App() {
  // Sets up game state and players so it can be passed down 
  // into the scoreboard after setup
  const initialState = {
    gameState: 'setup',
    players: {
      home: {
        id: '',
        name: 'Home'
      },
      away: {
        id: '',
        name: 'Away'
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
