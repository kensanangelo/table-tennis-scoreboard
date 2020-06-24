import React from 'react';
import { callApi, getPlayers } from '../API/API';


export default class Scoreboard extends React.Component {
	//Generates new away player options by remove home player from available
	generateAvailableAwayPlayers(initAvailable, compareId){
		let awayPlayers = [...initAvailable];
		for (let i = 0; i < awayPlayers.length; i++) {
			if(awayPlayers[i].player_id === compareId){
				awayPlayers.splice(i, 1);
			}
		}
		return awayPlayers;
	}

	constructor(props) {
		super(props);
		
		this.state = {
			gameMode: 'standard',
			gameState: 'setup',
			availablePlayers: [],
			availableAwayPlayers: [],
			serverStatus: 'CANNOT CONNECT TO API',
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
				}
			}
		};
	}
	
	componentDidMount() {
		let newState = this.state;

		// Checks to make sure we can even connect to api
		// then displays the server message
		callApi()
		.then(msg => {
			newState.serverStatus = msg;
			
			// If we can connect to server, fetch all players
			getPlayers()
			.then(availPlayers => {
				//Set available players to state, and 
				//sets first and last as defaults
				newState.availablePlayers = [...availPlayers];
				newState.players.home.id = availPlayers[0].player_id;
				newState.players.home.name = availPlayers[0].name;
				
				newState.availableAwayPlayers = this.generateAvailableAwayPlayers(newState.availablePlayers, newState.players.home.id);;
				
				newState.players.away.id = availPlayers[0].player_id;
				newState.players.away.name = availPlayers[0].name;
				
				this.setState(newState);
			});
		});
	}

	// Saves home player when changed
	onHomeChange(event){
		let newState = this.state;

		const index = event.target.selectedIndex;

		//Sets home player
		newState.players.home.id = event.target.options[index].value;
		newState.players.home.name = event.target.options[index].text;

		newState.availableAwayPlayers = this.generateAvailableAwayPlayers(newState.availablePlayers, newState.players.home.id);

		//If the home and away players are the same,
		//this assigns new away player from list of available
		if(newState.players.home.id === newState.players.away.id){
			newState.players.away.id = newState.availableAwayPlayers[0].player_id;
			newState.players.away.name = newState.availableAwayPlayers[0].name;
		}

      this.setState(newState);
	}

	// Saves away player when changed
	onAwayChange(event){
		let newState = this.state;

		const index = event.target.selectedIndex;
		
		newState.players.away.id = event.target.options[index].value;
		newState.players.away.name = event.target.options[index].text;
		
      this.setState(newState);
	}

	// Saves who's serving when changed
	onServingChange(event){
		let newState = this.state;

		if(event.target.value === 'home'){
			newState.players.home.isServing = true;
			newState.players.away.isServing = false;
		}else if(event.target.value === 'away'){
			newState.players.home.isServing = false;
			newState.players.away.isServing = true;
		}
		
      this.setState(newState);
	}

	// Saves who's serving when changed
	toggleServing(event){
		let newState = this.state;

		newState.players.home.isServing = !newState.players.home.isServing;
		newState.players.away.isServing = !newState.players.away.isServing;
	
		this.setState(newState);
	}

	// Starts game and passes up all our player info
	startGame(){
		const curState = this.state;
		this.props.startGame({
			gameMode: curState.gameMode,
			gameState: 'playing',
			players: {
				home: {
					id: curState.players.home.id,
					name: curState.players.home.name,
					isServing: curState.players.home.isServing
				},
				away: {
					id: curState.players.away.id,
					name: curState.players.away.name,
					isServing: curState.players.away.isServing
				}
			}
		})
	}

	// Changes the players to defaults and sets it as a practice game
	// then starts game
	setPracticeMode(){
		let newState = this.state;

		newState.gameMode = 'practice';
		newState.players.home.name = 'Home';
		newState.players.home.id = '';
		newState.players.away.name = 'Away';
		newState.players.away.id = '';
		
		this.setState(newState);
		
		this.startGame();
	}

	render(){
		const isServerConnected = this.state.serverStatus === 'Connected to API';

		return (
			<div className="setup">
				<h1 className="setup__header">Big Vision</h1>
				<h2 className="setup__subheader">Table Tennis League</h2>
				<div className="setup__players">
					<div className="setup__player setup__player--home">
						{this.state.availablePlayers.length !== 0 ? 
							<select 
								id="home-player" 
								value={this.state.players.home.id}
								onChange={this.onHomeChange.bind(this)}>
							{this.state.availablePlayers.map(
								(player) => {
									return <option 
										key={player.player_id} 
										value={player.player_id}>
											{player.name}
									</option>
								})}
							</select>
						: `No players available`}
					</div>
					<h2 className="setup__vs">VS</h2>
					<div className="setup__player setup__player--away">
						{this.state.availableAwayPlayers.length !== 0 ? 
							<select 
								id="away-player" 
								value={this.state.players.away.id}
								onChange={this.onAwayChange.bind(this)}>
							{this.state.availableAwayPlayers.map(
								(player, index) => {
									return <option 
										key={player.player_id} 
										value={player.player_id}>
											{player.name}
									</option>
								})}
							</select>
						: `No players available`}
					</div>
				</div>
				<div className={`setup__serving 
										${this.state.players.home.isServing === true ?
										`setup__serving--home` : `setup__serving--away`}`}
				>
			
					<div className="setup__serving-container">
						{this.state.players.away.isServing === true ?
							<button 
								className="setup__serving-button"
								onClick={this.toggleServing.bind(this)}>
									&lt; <h3 className="setup__serving-header">First Serve</h3>
							</button> : ``
						}
						{this.state.players.home.isServing === true ?
							<button 
								className="setup__serving-button"
								onClick={this.toggleServing.bind(this)}>
									<h3 className="setup__serving-header">First Serve</h3>
									&gt;
							</button> : ``
						}
					</div>
				</div>
				<div className='setup__buttons'>
					<button className='setup__btn-start btn-main' onClick={this.startGame.bind(this)}>
						Begin Match
					</button>
					<button className='setup__btn-practice btn-hollow' onClick={this.setPracticeMode.bind(this)}>
						Practice Game
					</button>
				</div>
				<p 
					className={`setup__server
						${isServerConnected ?
							``:`error-msg`}
					`}>
					{this.state.serverStatus}
				</p>
			</div>
	)};
}