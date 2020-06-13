import React from 'react';

export default class GameOver extends React.Component {

	render() {
		return (
			<div className="scoreboard__gameover">
				<h1>GAME OVER</h1>
				<p>{this.props.winner} wins!</p>
				<button onClick={() => this.props.setNewGame()}>
					Start New Game
				</button>
			</div>
		);
	}
}