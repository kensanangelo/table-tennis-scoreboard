import React from "react";
import ScoreCard from './ScoreCard';
import { sendGameReport } from '../API/API';

export default class Scoreboard extends React.Component {
	constructor(props) {
		super(props);

		//For now, it picks who starts serving randomly
		let isHomeServing = true;
		
		if(Math.random() >= 0.5){
			isHomeServing = false;
		}
		
		//* Official rules state rotating every:
		//* 2 points for 11 point games
		//* 5 points for 21 point games
		const winScore = {
			official: 11,
			longPlay: 21,
		}
		
		const servingRotation = {
			official: 2,
			longPlay: 5,
		};

		//* Gamestate can be:
		//* playing
		//* overtime
		//* gameover

		this.state = {
			winScore: winScore.official,
			serveChangeLimit: servingRotation.longPlay,
			plays: 0,
			gameState: 'playing',
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
		document.addEventListener("keydown", this.handleKeyPress, false);
	}

	componentWillUnmount(){
		document.removeEventListener("keydown", this.handleKeyPress, false);
	}
	

	handleKeyPress = (event) => {
		if(this.state.gameState !== 'gameOver'){

			//* Home team scoring is mapped to the Z button
			//* Away team is mapped to P button
			if(event.key === 'z'){
				console.log('Home Scores!')
				this.nextPlay('home')
				
			}else if(event.key === 'p'){
				console.log('Away Scores!')
				this.nextPlay('away')
			}
			
		}
	}

	//This processes the current play and starts the next play
	nextPlay = (whoScored) => {
		let newState = this.state;

		newState = this.incrementPlays(newState);

		if(whoScored === 'home'){
			newState.home.score++;
		}else if(whoScored === 'away'){
			newState.away.score++;
		}

		if(this.checkForOvertime(newState)){
			newState.gameState = 'overtime';
		}

		newState = this.checkForWinner(newState);


		//console.log(newState);
		
		this.setState(newState);
	}

	incrementPlays(state) {
		//* Adds a play and decides if we need to switch servers
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
		if(state.gameState === 'overtime'){
			if(state.home.score - state.away.score >= 2){
				winner = state.home.name;
			}else if(state.away.score - state.home.score >= 2){
				winner = state.away.name;
			}
		}else{
			if(state.home.score === state.winScore){
				winner = state.home.name;
			}else if(state.away.score === state.winScore){
				winner = state.away.name;
			}
		}

		if(winner !== ''){
			state.winner = winner;
			state.gameState = 'gameOver';

			console.log(sendGameReport(state));
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
						<h2>GAME OVER</h2>
						<p>{this.state.winner} wins!</p>
					</div>
				: ``}
			</div>
		);
	}
}