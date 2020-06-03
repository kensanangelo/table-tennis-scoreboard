import React from 'react';
import { callApi, getPlayers } from '../API/API';


export default class Scoreboard extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			gameState: 'setup',
			availablePlayers: [],
			serverStatus: 'CANNOT CONNECT TO API',
			players: {
				home: {
					id: '',
					name: ''
				},
				away: {
					id: '',
					name: ''
				}
				}
			};
	}
	
	componentDidMount() {
		let newState = this.state;

		callApi()
		.then(msg => {
			newState.serverStatus = msg;
			
			getPlayers()
			.then(availPlayers => {
				newState.availablePlayers = availPlayers;

				newState.players.home.id = availPlayers[0].player_id;
				newState.players.home.name = availPlayers[0].name;

				const numPlayers = availPlayers.length - 1;
				console.log(availPlayers.length);
				
				newState.players.away.id = availPlayers[numPlayers].player_id;
				newState.players.away.name = availPlayers[numPlayers].name;
				
				this.setState(newState);
			});
		});
	}

	homeChange(event){
		let newState = this.state;

		const index = event.target.selectedIndex;
		newState.players.home.id = event.target.options[index].value;
		newState.players.home.name = event.target.options[index].text;

      this.setState(newState);
	}

	awayChange(event){
		let newState = this.state;

		const index = event.target.selectedIndex;
		newState.players.away.id = event.target.options[index].value;
		newState.players.away.name = event.target.options[index].text;
		
      this.setState(newState);
	}

	changeGamestate(){
		const curState = this.state;
		this.props.changeGamestate({
			gameState: 'playing',
			players: {
				home: {
					id: curState.players.home.id,
					name: curState.players.home.name
				},
				away: {
					id: curState.players.away.id,
					name: curState.players.away.name
				}
			}
		})
	}

	render(){
		return (
			<div className="setup">
				{this.state.serverStatus === 'Connected to API' ? 
					<p className="setup__server">
						{this.state.serverStatus}
					</p>
				:
					<p className="setup__server error-msg">
						{this.state.serverStatus}
					</p>
				}
				<h1 className="setup__header">Enter players</h1>
				<div className="setup__players">
					<div className="setup__player setup__player--home">
						<h2 className="setup__player-header">Home</h2>
						{this.state.availablePlayers.length !== 0 ? 
							<select id="home-player" onChange={this.homeChange.bind(this)}>
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
					<div className="setup__player setup__player--away">
						<h2 className="setup__player-header">Away</h2>
						{this.state.availablePlayers.length !== 0 ? 
							<select id="away-player" onChange={this.awayChange.bind(this)}>
							{this.state.availablePlayers.slice(0).reverse().map(
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
				</div>
				<button onClick={this.changeGamestate.bind(this)}>Start Game</button>
			</div>
	)};
}