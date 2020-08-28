import React from 'react';
import { callApi, getPlayers } from '../API/API';

export default class Scoreboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			gameMode: 'standard',
			gameState: 'setup',
			availablePlayers: [],
			isServerConnected: false,
			players: {
				home: {
					id: '',
					name: '',
					isServing: true,
				},
				away: {
					id: '',
					name: '',
					isServing: false,
				},
			},
		};
	}

	componentDidMount() {
		let newState = this.state;

		// Checks to make sure we can even connect to api
		// then displays the server message
		callApi().then((msg) => {
			newState.isServerConnected = true;

			// If we can connect to server, fetch all players
			getPlayers().then((availPlayers) => {
				if (availPlayers) {
					//Set available players to state, and
					//sets first and last as defaults
					newState.availablePlayers = [...availPlayers];
					newState.players.home.id = availPlayers[0].player_id;
					newState.players.home.name = availPlayers[0].name;

					newState.players.away.id =
						newState.availablePlayers[1].player_id;
					newState.players.away.name = newState.availablePlayers[1].name;

					this.setState(newState);
				}
			});
		});
	}

	// Saves home player when changed
	onHomeChange(event) {
		let newState = this.state;

		const index = event.target.selectedIndex;

		//Sets home player
		newState.players.home.id = event.target.options[index].value;
		newState.players.home.name = event.target.options[index].text;

		//If the home and away players are the same,
		//this assigns new away player
		if (newState.players.home.id === newState.players.away.id) {
			const newPlayer = this.pickNewAwayPlayer(newState.players.home.id, [
				...newState.availablePlayers,
			]);

			newState.players.away.id = newPlayer.id;
			newState.players.away.name = newPlayer.name;
		}

		this.setState(newState);
	}

	// Picks a new away player
	// AVOIDING the current home player
	pickNewAwayPlayer(homePlayerId, players) {
		let id, name;

		for (let i = 0; i < players.length; i++) {
			if (homePlayerId !== players[i].player_id) {
				id = players[i].player_id;
				name = players[i].name;

				break;
			}
		}

		return { id, name };
	}

	// Saves away player when changed
	onAwayChange(event) {
		let newState = this.state;

		const index = event.target.selectedIndex;

		newState.players.away.id = event.target.options[index].value;
		newState.players.away.name = event.target.options[index].text;

		this.setState(newState);
	}

	// Saves who's serving when changed
	onServingChange(event) {
		let newState = this.state;

		if (event.target.value === 'home') {
			newState.players.home.isServing = true;
			newState.players.away.isServing = false;
		} else if (event.target.value === 'away') {
			newState.players.home.isServing = false;
			newState.players.away.isServing = true;
		}

		this.setState(newState);
	}

	// Saves who's serving when changed
	toggleServing(event) {
		let newState = this.state;

		newState.players.home.isServing = !newState.players.home.isServing;
		newState.players.away.isServing = !newState.players.away.isServing;

		this.setState(newState);
	}

	// Starts game and passes up all our player info
	startGame() {
		const curState = this.state;
		this.props.startGame({
			gameMode: curState.gameMode,
			gameState: 'playing',
			players: {
				home: {
					id: curState.players.home.id,
					name: curState.players.home.name,
					isServing: curState.players.home.isServing,
				},
				away: {
					id: curState.players.away.id,
					name: curState.players.away.name,
					isServing: curState.players.away.isServing,
				},
			},
		});
	}

	// Changes the players to defaults and sets it as a practice game
	// then starts game
	setPracticeMode() {
		let newState = this.state;

		newState.gameMode = 'practice';
		newState.players.home.name = 'Home';
		newState.players.home.id = '';
		newState.players.away.name = 'Away';
		newState.players.away.id = '';

		this.setState(newState);

		this.startGame();
	}

	render() {
		return (
			<div className='setup'>
				<h1 className='setup__header'>Big Vision</h1>
				<h2 className='setup__subheader'>Table Tennis League</h2>
				<div className='setup__players'>
					<div className='setup__player setup__player--home'>
						{this.state.availablePlayers.length !== 0 ? (
							<select
								id='home-player'
								value={this.state.players.home.id}
								onChange={this.onHomeChange.bind(this)}
							>
								{this.state.availablePlayers.map((player) => {
									return (
										<option
											key={player.player_id}
											value={player.player_id}
										>
											{player.name}
										</option>
									);
								})}
							</select>
						) : (
							`No players available`
						)}
					</div>
					<h2 className='setup__vs'>VS</h2>
					<div className='setup__player setup__player--away'>
						{this.state.availablePlayers.length !== 0 ? (
							<select
								id='away-player'
								value={this.state.players.away.id}
								onChange={this.onAwayChange.bind(this)}
							>
								{this.state.availablePlayers.map((player, index) => {
									if (
										this.state.players.home.id !== player.player_id
									) {
										return (
											<option
												key={player.player_id}
												value={player.player_id}
											>
												{player.name}
											</option>
										);
									} else return '';
								})}
							</select>
						) : (
							`No players available`
						)}
					</div>
				</div>
				<div
					className={`setup__serving 
										${
											this.state.players.home.isServing === true
												? `setup__serving--home`
												: `setup__serving--away`
										}`}
				>
					<div className='setup__serving-container'>
						{this.state.players.away.isServing === true ? (
							<button
								className='setup__serving-button'
								onClick={this.toggleServing.bind(this)}
							>
								&lt;{' '}
								<h3 className='setup__serving-header'>First Serve</h3>
							</button>
						) : (
							``
						)}
						{this.state.players.home.isServing === true ? (
							<button
								className='setup__serving-button'
								onClick={this.toggleServing.bind(this)}
							>
								<h3 className='setup__serving-header'>First Serve</h3>
								&gt;
							</button>
						) : (
							``
						)}
					</div>
				</div>
				<button
					className='btn-hollow stats__btn'
					onClick={() => this.props.setGameState('stats')}
				>
					Leaderboard
				</button>
				<div className='setup__buttons'>
					<button
						className='setup__btn-start btn-main'
						onClick={this.startGame.bind(this)}
					>
						Begin Match
					</button>
					<button
						className='setup__btn-practice btn-hollow'
						onClick={this.setPracticeMode.bind(this)}
					>
						Practice Game
					</button>
				</div>
				<p
					className={`setup__server
						${this.state.isServerConnected ? `` : `error-msg`}
					`}
				>
					{this.state.isServerConnected
						? 'Connected to API'
						: 'CANNOT CONNECT TO API'}
				</p>
			</div>
		);
	}
}
