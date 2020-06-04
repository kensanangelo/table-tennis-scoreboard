import React from "react";
import ScoreCard from './ScoreCard';
import { sendGameReport } from '../API/API';

export default class Scoreboard extends React.Component {
	constructor(props) {
		super(props);

		//* Activate this if you want to randomly select who serves first
		// let isHomeServing = true;
		
		// if(Math.random() >= 0.5){
		// 	isHomeServing = false;
		// }
		
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

		this.state = {
			winScore: winScore.official,
			serveChangeLimit: servingRotation.longPlay,
			plays: 0,
			gameMode: this.props.gameMode,
			gameState: 'playing',
			winner: {
				id: 0,
				name: ''
			},
			home: {
				id: props.players.home.id,
				name: props.players.home.name,
				score: 0,
				isServing: props.players.home.isServing,
			},
			away: {
				id: props.players.away.id,
				name: props.players.away.name,
				score: 0,
				isServing: props.players.away.isServing,
			}
		};
	}
	
	componentDidMount() {
		document.addEventListener("keyup", this.handleKeyPress, false);
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
		function setWinner(player){
			let result = {
				id: player.id,
				name: player.name
			};
	
			return result;
		}

		let winner = {
			id: '',
			name: ''
		};

		//If it's overtime, the win conditions are different
		if(state.gameState === 'overtime'){
			if(state.home.score - state.away.score >= 2){
				winner = setWinner(state.home);
			}else if(state.away.score - state.home.score >= 2){
				winner = setWinner(state.away);
			}
		}else{ //Regular win conditions
			if(state.home.score === state.winScore){
				winner = setWinner(state.home);
			}else if(state.away.score === state.winScore){
				winner = setWinner(state.away);
			}
		}

		if(winner.name !== ''){
			state.winner = winner;
			state.gameState = 'gameOver';

			if(state.gameMode === 'standard'){
				//Sends the game results to the backend api
				//Logs the response to the console
				sendGameReport(state)
					.then(msg => console.log(msg))
					.catch(err => console.log(err));
			}
		}


		return state;
	}

	render() {
		return (
			<div className="scoreboard">
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
						<p>{this.state.winner.name} wins!</p>
						<button onClick={() => this.props.setNewGame()}>
							Start New Game
						</button>
					</div>
				: ``}
			</div>
		);
	}
}