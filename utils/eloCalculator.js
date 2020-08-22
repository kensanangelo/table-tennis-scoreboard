var Elo = require('arpad');

const getProbablityToWin = (playerScore, opponentScore) => {
	let oddsPlayerWins = elo.expectedScore(playerScore, opponentScore);
	percentagePlayerWins = (oddsPlayerWins * 100).toFixed(2);
	console.log(
		'The odds of the player winning are about:',
		percentagePlayerWins + '%'
	);

	return percentagePlayerWins;
};

const updateWinnerElo = (winner, opponent) => {};

const updateLoserElo = (loser, opponent) => {};

module.exports = {
	getProbablityToWin,
	updateWinnerElo,
	updateLoserElo,
};
