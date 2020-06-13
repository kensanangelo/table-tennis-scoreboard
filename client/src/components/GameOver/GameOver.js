import React from 'react';

export default class GameOver extends React.Component {

	render() {
		return (
			<div className="gameover">
				{/* <div className="gameover__bv-container">
					<h3 class="gameover__bv-header">Big Vision</h3>
					<h4 class="gameover__bv-subheader">Table Tennis League</h4>
				</div> */}
				<h2 className="gameover__gameover">Game Over</h2>
				<h1 className="gameover__winner">{this.props.winner} wins!</h1>

				<p className="gameover__score">{this.props.homeScore}-{this.props.awayScore}</p>
				<button 
					className="gameover__btn-new btn-main"
					onClick={() => this.props.setNewGame()}>
					Start New Match
				</button>
			</div>
		);
	}
}