import React, { useEffect } from 'react';
import './styles/App.scss';
import Clock from './components/Clock/Clock';
import Scoreboard from './components/Scoreboard/Scoreboard';

function App() {
  useEffect(() => {
    document.title = "Scoreboard"
  }, []);

  return (
    <div className="App">
      <Clock />
      <Scoreboard />
    </div>
  );
}

export default App;
