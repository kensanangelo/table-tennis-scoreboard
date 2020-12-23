import React from 'react';
import { callApi, getPlayers, getWinChances } from '../API/API';

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
					eloScore: null,
					percentChance: null,
				},
				away: {
					id: '',
					name: '',
					isServing: false,
					eloScore: null,
					percentChance: null,
				},
			},
		};
	}

	async componentDidMount() {
		let newState = this.state;

		// Checks to make sure we can even connect to api
		// then displays the server message
		const msg = await callApi();

		newState.isServerConnected = true;

		// If we can connect to server, fetch all players
		const availPlayers = await getPlayers();
		if (availPlayers) {
			//Set available players to state, and
			//sets first and last as defaults

			newState.availablePlayers = [...availPlayers];
			newState.players.home.id = availPlayers[0].player_id;
			newState.players.home.name = availPlayers[0].name;
			newState.players.home.eloScore = availPlayers[0].eloScore;

			newState.players.away.id = newState.availablePlayers[1].player_id;
			newState.players.away.name = newState.availablePlayers[1].name;
			newState.players.away.eloScore = newState.availablePlayers[1].eloScore;

			const chanceResults = await getWinChances(
				newState.players.home.eloScore,
				newState.players.away.eloScore
			);

			if (chanceResults.homeWinChance && chanceResults.awayWinChance) {
				newState.players.home.percentChance = chanceResults.homeWinChance;
				newState.players.away.percentChance = chanceResults.awayWinChance;
			}

			this.setState(newState);
		}
	}

	// Saves home player when changed
	async onHomeChange(event) {
		let newState = this.state;

		const index = event.target.selectedIndex;

		const splitResults = event.target.options[index].value.split(':');

		const newHomeId = splitResults[0];
		const newHomeElo = splitResults[1];

		//Sets home player
		newState.players.home.id = newHomeId;
		newState.players.home.name = event.target.options[index].text;
		newState.players.home.eloScore = newHomeElo;
		console.log('newState.players.home', newState.players.home);

		//If the home and away players are the same,
		//this assigns new away player
		if (newState.players.home.id === newState.players.away.id) {
			const newPlayer = this.pickNewAwayPlayer(newState.players.home.id, [
				...newState.availablePlayers,
			]);

			newState.players.away.id = newPlayer.id;
			newState.players.away.name = newPlayer.name;
			newState.players.away.eloScore = newPlayer.eloScore;
		}

		const chanceResults = await getWinChances(
			newState.players.home.eloScore,
			newState.players.away.eloScore
		);

		if (chanceResults.homeWinChance && chanceResults.awayWinChance) {
			newState.players.home.percentChance = chanceResults.homeWinChance;
			newState.players.away.percentChance = chanceResults.awayWinChance;
		}

		console.log('chanceResults: ', chanceResults);

		this.setState(newState);
	}

	// Picks a new away player
	// AVOIDING the current home player
	pickNewAwayPlayer(homePlayerId, players) {
		let id, name, eloScore;

		for (let i = 0; i < players.length; i++) {
			if (homePlayerId !== players[i].player_id) {
				id = players[i].player_id;
				name = players[i].name;
				eloScore = players[i].eloScore;
				break;
			}
		}

		return { id, name, eloScore };
	}

	// Saves away player when changed
	async onAwayChange(event) {
		let newState = this.state;

		const index = event.target.selectedIndex;

		const splitResults = event.target.options[index].value.split(':');

		const newAwayId = splitResults[0];
		const newAwayElo = splitResults[1];

		newState.players.away.id = newAwayId;
		newState.players.away.name = event.target.options[index].text;
		newState.players.away.eloScore = newAwayElo;

		const chanceResults = await getWinChances(
			newState.players.home.eloScore,
			newState.players.away.eloScore
		);

		if (chanceResults.homeWinChance && chanceResults.awayWinChance) {
			newState.players.home.percentChance = chanceResults.homeWinChance;
			newState.players.away.percentChance = chanceResults.awayWinChance;
		}

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
						<div className='setup__player-chance'>
							{this.state.players.home.percentChance}
						</div>
						{this.state.availablePlayers.length !== 0 ? (
							<select
								id='home-player'
								value={
									this.state.players.home.id +
									':' +
									this.state.players.home.eloScore
								}
								onChange={this.onHomeChange.bind(this)}
							>
								{this.state.availablePlayers.map((player) => {
									return (
										<option
											key={player.player_id}
											value={
												player.player_id + ':' + player.eloScore
											}
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
						<div className='setup__player-chance'>
							{this.state.players.away.percentChance}
						</div>
						{this.state.availablePlayers.length !== 0 ? (
							<select
								id='away-player'
								value={
									this.state.players.away.id +
									':' +
									this.state.players.away.eloScore
								}
								onChange={this.onAwayChange.bind(this)}
							>
								{this.state.availablePlayers.map((player, index) => {
									if (
										this.state.players.home.id !== player.player_id
									) {
										return (
											<option
												key={player.player_id}
												value={
													player.player_id + ':' + player.eloScore
												}
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
