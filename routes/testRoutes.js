const express = require('express');
const router = express.Router();
const { calculateWinChance } = require('../utils/eloCalculator');

// Calculates the win chance of a given player elo against an opponent elo
router.get('/calculate-win-chance', (req, res) => {
	console.log('params ', req.query);
	const { playerElo, opponentElo } = req.query;

	const winChance = calculateWinChance(
		parseInt(playerElo),
		parseInt(opponentElo)
	);

	const loseChance = calculateWinChance(
		parseInt(opponentElo),
		parseInt(playerElo)
	);

	console.log('winChance: ', winChance);
	console.log('loseChance: ', loseChance);

	res.json({ status: 'success', data: { winChance, loseChance } });
});

module.exports = router;
