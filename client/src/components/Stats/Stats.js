import React from 'react';
import { callApi, getStats } from '../API/API';

export default class Stats extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			stats: [],
		};
	}

	componentDidMount() {
		callApi().then((msg) => {
			getStats().then((stats) => {
				this.setState({ stats });
			});
		});
	}

	render() {
		return (
			<div className='stats'>
				<table className='stats__table'>
					<thead>
						<tr>
							<th>Player</th>
							<th>Wins</th>
							<th>Losses</th>
							<th>Winrate</th>
							<th>Overtime Matches</th>
							<th>Longest Match</th>
						</tr>
					</thead>
					<tbody>
						{this.state.stats.map((stat, index) => {
							return (
								<tr key={index}>
									<td>
										{index === 0 ? (
											// eslint-disable-next-line
											<span role='img'>👑 {stat.name} 👑</span>
										) : (
											stat.name
										)}
									</td>
									<td>{stat.wins}</td>
									<td>{stat.losses}</td>
									<td>{stat.winrate}%</td>
									<td>{stat.overtime}</td>
									<td>{stat.plays} points</td>
								</tr>
							);
						})}
					</tbody>
				</table>

				<button
					className='return btn-main'
					onClick={() => this.props.setGameState('setup')}
				>
					Go Back
				</button>
			</div>
		);
	}
}
