const Elo = require('arpad');
var elo = new Elo();

exports.getProbablityToWin = (playerScore, opponentScore) => {
	let oddsPlayerWins = elo.expectedScore(playerScore, opponentScore);
	percentagePlayerWins = (oddsPlayerWins * 100).toFixed(2);
	console.log(
		'The odds of the player winning are about:',
		percentagePlayerWins + '%'
	);

	return percentagePlayerWins;
};

exports.updateWinnerElo = (winner, opponent) => {};

exports.updateLoserElo = (loser, opponent) => {};

exports.rankGames = (players, games) => {
	games.forEach((game) => {
		const homePlayerArray = players.filter(
			(player) => player.player_id === game.home.player_id
		);

		const awayPlayerArray = players.filter(
			(player) => player.player_id === game.away.player_id
		);

		const homePlayer = homePlayerArray[0];
		const awayPlayer = awayPlayerArray[0];

		const winnerId = game.winner.player_id;
		let winner;

		if (winnerId === homePlayer.player_id) {
			winner = 'home';
		} else if (winnerId === awayPlayer.player_id) {
			winner = 'away';
		}

		const results = this.rankSingleGame(
			homePlayer.elo,
			homePlayer.elo,
			winner
		);
		console.log(results);
	});

	return { players, games };
};

exports.rankSingleGame = (home, away, winner) => {
	console.log('Game:');

	console.log(`Before home elo: ${home.elo}`);
	console.log(`Before away elo: ${away.elo}`);

	console.log('Winner: ', winner);

	let newHomeElo = 1200;
	let newAwayElo = 1200;

	let doesHomeWin = 0.5;
	let doesAwayWin = 0.5;

	var odds_home_wins = elo.expectedScore(home.elo, away.elo);
	var odds_away_wins = elo.expectedScore(away.elo, home.elo);

	if (winner === 'home') {
		console.log('Home wins');
		doesHomeWin = 1;
		doesAwayWin = 0;
	} else if (winner === 'away') {
		console.log('Away wins');
		doesHomeWin = 0;
		doesAwayWin = 1;
	}

	console.log(doesHomeWin);
	console.log(doesAwayWin);

	newHomeElo = elo.newRating(odds_home_wins, doesHomeWin, home.elo);
	newAwayElo = elo.newRating(odds_away_wins, doesAwayWin, away.elo);

	console.log(`After home elo: ${newHomeElo}`);
	console.log(`After away elo: ${newAwayElo}`);
	console.log('============================');

	return {
		home: { id: home.player_id, elo: newHomeElo },
		away: { id: away.player_id, elo: newAwayElo },
	};
};
