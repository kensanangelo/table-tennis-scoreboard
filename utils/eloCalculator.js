const Elo = require('arpad');
const elo = new Elo();

/**
 * Calculate the win chance for the player against an opponent
 * @param {number} playerScore - The challenger's elo score
 * @param {number} opponentScore - The opponent's elo score
 *
 * @returns {number} - The percent chance that the player will win against the opponent
 */
exports.calculateWinChance = (playerScore, opponentScore) => {
	const oddsPlayerWins = elo.expectedScore(playerScore, opponentScore);
	//console.log('oddsPlayerWins: ', oddsPlayerWins);
	const resultsPercent = Math.round(oddsPlayerWins * 100).toFixed();
	return resultsPercent + '%';
};

exports.calculateEloForWin = (playerScore, opponentScore) => {
	const odds_player_won = elo.expectedScore(playerScore, opponentScore);
	const newPlayerElo = elo.newRating(odds_player_won, 1, playerScore);
	return newPlayerElo;
};

exports.calculateEloForLose = (playerScore, opponentScore) => {
	const odds_player_won = elo.expectedScore(playerScore, opponentScore);
	const newPlayerElo = elo.newRating(odds_player_won, 0, playerScore);
	return newPlayerElo;
};
