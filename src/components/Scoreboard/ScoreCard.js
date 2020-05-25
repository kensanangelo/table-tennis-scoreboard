import React from 'react';

export default class ScoreCard extends React.Component {

	render() {
		return (
			<div className="scoreboard__card">
				<div className="scoreboard__serving-container">
					{this.props.isServing ? 
						<div className="scoreboard__serving"></div>
					: ``}
				</div>
				<div className="scoreboard__name">
					{this.props.name}
				</div>
				<div className="scoreboard__score">
					{this.props.score}
				</div>
			</div>
		);
	}
 }