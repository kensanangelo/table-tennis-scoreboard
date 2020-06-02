import React from "react";
import ScoreCard from './ScoreCard';
import { sendGameReport, getPlayers } from '../API/API';

export default class Scoreboard extends React.Component {
	constructor(props) {
		super(props);

		//* For now, it picks who starts serving randomly
		//TODO Add setup screen to choose these things
		let isHomeServing = true;
		
		if(Math.random() >= 0.5){
			isHomeServing = false;
		}
		
		//* Official rules state rotating every:
		//* 2 points for 11 point games
		//* 5 points for 21 point games

		//* We play 5 points for 11 point games
		//* That will be the default until I can convince them otherwise
		const winScore = {
			official: 11,
			longPlay: 21,
		}
		
		const servingRotation = {
			official: 2,
			longPlay: 5,
		};

		//* Gamestate can be:
		//* setup
		//* playing
		//* overtime
		//* gameover

		this.state = {
			players: [],
			winScore: winScore.official,
			serveChangeLimit: servingRotation.longPlay,
			plays: 0,
			gameState: 'setup',
			winner: '',
			home: {
				name: 'Home',
				score: 0,
				isServing: isHomeServing,
			},
			away: {
				name: 'Away',
				score: 0,
				isServing: !isHomeServing,
			}
		};
	}
	
	componentDidMount() {
		document.addEventListener("keyup", this.handleKeyPress, false);

		let newState = this.state;
		
		getPlayers()
		.then(players => {
			newState.players = players;
			this.setState(newState);
		});
	}

	componentWillUnmount(){
		document.removeEventListener("keyup", this.handleKeyPress, false);
	}
	

	handleKeyPress = (event) => {
		if(this.state.gameState !== 'gameOver'){
			//* Home team scoring is mapped to the Z button
			//* Away team is mapped to P button
			if(event.key === 'z'){
				this.nextPlay('home')
				
			}else if(event.key === 'p'){
				this.nextPlay('away')
			}
		}

		//TODO Add reset functionality
		//TODO Add referee/admin code to make ingame changes
	}

	//This processes the current play and starts the next play
	nextPlay = (whoScored) => {
		let newState = this.state;

		newState = this.incrementPlays(newState);

		//Gives the point to whoever got it
		if(whoScored === 'home'){
			newState.home.score++;
		}else if(whoScored === 'away'){
			newState.away.score++;
		}

		//Checks if we need to go into overtime
		if(this.checkForOvertime(newState)){
			newState.gameState = 'overtime';
		}

		//Checks if someone has won, and if so, does win state setup
		newState = this.checkForWinner(newState);

		this.setState(newState);
	}

	incrementPlays(state) {
		// Adds a play and decides if we need to switch servers
		//* A play is not considered happened until someone scores
		
		state.plays++;

		if (state.plays % state.serveChangeLimit === 0) {
			state.home.isServing = !state.home.isServing;
			state.away.isServing = !state.away.isServing;
		}

		return state;
	}

	checkForOvertime(state) {
		if(state.gameState === 'overtime'){ return true; }
		
		const almostWin = state.winScore - 1;

		if(state.home.score === almostWin
			&& state.away.score === almostWin){
			return true;
		}
		
		return false;
	}

	checkForWinner(state) {
		let winner = '';

		//If it's overtime, the win conditions are different
		if(state.gameState === 'overtime'){
			if(state.home.score - state.away.score >= 2){
				winner = state.home.name;
			}else if(state.away.score - state.home.score >= 2){
				winner = state.away.name;
			}
		}else{ //Regular win conditions
			if(state.home.score === state.winScore){
				winner = state.home.name;
			}else if(state.away.score === state.winScore){
				winner = state.away.name;
			}
		}

		if(winner !== ''){
			state.winner = winner;
			state.gameState = 'gameOver';

			//Sends the game results to the backend api
			//Logs the response to the console
			sendGameReport(state)
				.then(msg => console.log(msg))
				.catch(err => console.log(err));
		}


		return state;
	}

	render() {
		const hasPlayers = this.state.players.length !== 0;
							
		return (
			<div className="scoreboard">
				{this.state.gameState === 'setup' ? 
					<div className="scoreboard__setup">
						<h1 className="setup__header">Enter players</h1>
						<div className="setup__players">
							<div className="setup__player setup__player--home">
								<h2 className="setup__player-header">Home</h2>
								{hasPlayers ? 
									<select id="home-player">
									{this.state.players.map(
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
								{hasPlayers ? 
									<select id="away-player">
									{this.state.players.map(
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
					</div>
				: 
				<>
					<ScoreCard 
						name={this.state.home.name} 
						score={this.state.home.score} 
						isServing={this.state.home.isServing} />
					<ScoreCard 
						name={this.state.away.name} 
						score={this.state.away.score} 
						isServing={this.state.away.isServing} />

					{this.state.gameState === 'gameOver' ? 
						<div className="scoreboard__gameover">
							<h1>GAME OVER</h1>
							<p>{this.state.winner} wins!</p>
						</div>
					: ``}
				</>
				}
			</div>
		);
	}
}