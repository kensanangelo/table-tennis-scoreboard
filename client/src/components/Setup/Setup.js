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
				
				this.setState(newState);
			});
		});
	}



	changeGamestate(){
		this.props.changeGamestate({
			gameState: 'setup',
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
			})
	}

	render(){
		return (
			<div className="setup">
				<p className="setup__server">{this.state.serverStatus}</p>
				<h1 className="setup__header">Enter players</h1>
				<div className="setup__players">
					<div className="setup__player setup__player--home">
						<h2 className="setup__player-header">Home</h2>
						{this.state.availablePlayers.length !== 0 ? 
							<select id="home-player">
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
							<select id="away-player">
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
				<button onClick={this.changeGamestate}>Start Game</button>
			</div>
	)};
}