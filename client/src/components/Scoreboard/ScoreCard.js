import React from 'react';

export default class ScoreCard extends React.Component {

	render() {
		return (
			<div className="scoreboard__card">
				<div className="scoreboard__score">
					{this.props.score}
				</div>
				<div className={`scoreboard__name ${this.props.isServing ? 
						`scoreboard__name--serving` 
					: ``}`}>
					{this.props.name}
				</div>
			</div>
		);
	}
 }