import React from "react";
import ScoreCard from './ScoreCard';

export default class Scoreboard extends React.Component {
	constructor(props) {
		super(props);

		//For now, it picks who starts serving randomly
		let isHomeServing = true;

		if(Math.random() >= 0.5){
			isHomeServing = false;
		}
	
		this.state = {
			plays: 0,
			home: {
				score: 0,
				isServing: isHomeServing,
			},
			away: {
				score: 0,
				isServing: !isHomeServing,
			}
		};
	}

	handleKeyPress = (event) => {
		if(event.key === 'z'){
		  console.log('Home Scores!')
		  this.nextPlay('home')
		  
		}else if(event.key === 'p'){
			console.log('Away Scores!')
			this.nextPlay('away')
		}
	}

	nextPlay = (whoScored) => {
		let newState = this.state;

		newState.plays++;

		console.log(newState.plays);
		
		
		if(newState.plays % 5 === 0){
			newState.home.isServing = !newState.home.isServing;
			newState.away.isServing = !newState.away.isServing;
		}

		if(whoScored === 'home'){
			newState.home.score++;
		}else if(whoScored === 'away'){
			newState.away.score++;
		}

		console.log(newState);
		this.setState(newState);
		
	}

	componentDidMount(){
		document.addEventListener("keydown", this.handleKeyPress, false);
	}
	componentWillUnmount(){
		document.removeEventListener("keydown", this.handleKeyPress, false);
	}

	render() {
		return (
			<div className="scoreboard" tabIndex="0">
				<ScoreCard 
					name="Home"
					score={this.state.home.score} 
					isServing={this.state.home.isServing} />
				<ScoreCard 
					name="Away"
					score={this.state.away.score} 
					isServing={this.state.away.isServing} />
			</div>
		);
	}
 }