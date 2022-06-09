import React from 'react';

export default class GameOver extends React.Component {
	render() {
		return (
			<div className='gameover'>
				<h2 className='gameover__gameover'>Game Over</h2>
				<h1 className='gameover__winner'>{this.props.winner} wins!</h1>

				<p className='gameover__score'>
					{this.props.home.name} {this.props.home.score} -{' '}
					{this.props.away.score} {this.props.away.name}
				</p>
				<button
					className='gameover__btn-new btn-main'
					onClick={() => this.props.setNewGame()}
				>
					Start New Match
				</button>
			</div>
		);
	}
}
