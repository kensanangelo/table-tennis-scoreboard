import React, { useState } from 'react';
import './styles/App.scss';
import Clock from './components/Clock/Clock';
import Setup from './components/Setup/Setup';
import Scoreboard from './components/Scoreboard/Scoreboard';
import GameOver from './components/GameOver/GameOver';
import Stats from './components/Stats/Stats';
import OvertimeMusic from './audio/boss-music.mp3';
import GameoverMusic from './audio/another.mp3';

import Background from './img/bg.jpg';
import BackgroundWin from './img/bg-win.jpg';

function App() {
	// Sets up game state and players so it can be passed down
	// into the scoreboard after setup

	//* Gamestate can be:
	//* setup
	//* playing
	//* overtime
	//* gameover
	//* stats

	//* Game mode can be:
	//* standard
	//* practice

	const initialState = {
		gameMode: 'standard',
		gameState: 'setup',
		winner: {
			id: 0,
			name: '',
		},
		players: {
			home: {
				id: '',
				name: 'Home',
				score: 0,
				eloScore: null,
				isServing: true,
			},
			away: {
				id: '',
				name: 'Away',
				score: 0,
				eloScore: null,
				isServing: false,
			},
		},
	};

	const [state, setState] = useState(initialState);

	const setOvertime = () => {
		state.gameState = 'overtime';
		setState({ ...state });
	};

	const setGameOver = (results) => {
		state.gameState = 'gameover';
		state.winner = results.winner;
		state.players.home.score = results.scores.home;
		state.players.away.score = results.scores.away;
		setState({ ...state });
	};

	const setGameState = (status) => {
		state.gameState = status;
		setState({ ...state });
	};

	return (
		<div
			className={`App 
                      ${state.gameState === 'playing' ? 'App--playing' : ''}
                      ${state.gameState === 'overtime' ? 'App--overtime' : ''}`}
		>
			<img
				className='App__bg'
				src={state.gameState === 'gameover' ? BackgroundWin : Background}
				alt='Background gradient'
			/>
			<div className='App__container'>
				<Clock />
				{state.gameState === 'overtime' && (
					<audio controls autoplay='true' loop='true'>
						<source src={OvertimeMusic} />
					</audio>
				)}

				{state.gameState === 'gameover' && (
					<audio autoplay='true'>
						<source src={GameoverMusic} />
					</audio>
				)}
				{state.gameState === 'setup' ? (
					<Setup
						setGameState={setGameState}
						startGame={(p) => {
							setState(p);
						}}
					/>
				) : (
					``
				)}
				{state.gameState === 'playing' || state.gameState === 'overtime' ? (
					<Scoreboard
						players={state.players}
						gameMode={state.gameMode}
						setOvertime={() => {
							setOvertime();
						}}
						setGameOver={(results) => {
							setGameOver(results);
						}}
						setNewGame={() => {
							setState(initialState);
						}}
					/>
				) : (
					``
				)}
				{state.gameState === 'gameover' ? (
					<GameOver
						winner={state.winner.name}
						home={state.players.home}
						away={state.players.away}
						setNewGame={() => {
							setState(initialState);
						}}
					/>
				) : (
					``
				)}
				{state.gameState === 'stats' ? (
					<Stats setGameState={setGameState} />
				) : (
					``
				)}
			</div>
		</div>
	);
}

export default App;
