const express = require('express');
const router = express.Router();

const { submitGametoDB, getPlayers, getStats } = require('../utils');
const { calculateWinChance } = require('../utils/eloCalculator');
const { updatePlayerElo } = require('../utils');

const { checkToken } = require('../middleware/tokenAuth');

// Everything below here requires a token
router.use(checkToken);

router.get('/hello', (req, res) => {
	//* This is used to hit up the API to make sure it's responding correctly

	res.json({ status: 'success', data: { msg: 'API up and running' } });
});

// Submit a game to the DB, once it's over
router.post('/games', async (req, res) => {
	console.log(req.body);
	const { home, away, winner } = req.body;

	try {
		await submitGametoDB(req.body);

		let didHomeWin = null;
		let didAwayWin = null;

		if (winner.id === home.id) {
			didHomeWin = true;
			didAwayWin = false;
		} else if (winner.id === away.id) {
			didHomeWin = false;
			didAwayWin = true;
		}

		if (didHomeWin == null || didAwayWin == null)
			throw new Error('Did not have a winner');

		await updatePlayerElo(home.id, home.eloRank, away.eloRank, didHomeWin);

		await updatePlayerElo(away.id, away.eloRank, home.eloRank, didAwayWin);

		console.log('\x1b[32m', 'Game saved correctly');

		res.json({
			status: 'success',
			data: { message: `Game saved correctly.` },
		});
	} catch (err) {
		console.error('\x1b[31m', `DB ERROR: ${err}`);

		res.status(500).json({
			status: 'error',
			message: 'DB Insertion Failed. Reason: ' + err,
		});
	}
});

// Get all the stats for all players
router.get('/stats', async (req, res) => {
	try {
		const stats = await getStats();

		res.send({ status: 'success', data: { stats } });
	} catch (err) {
		console.error('GET STATS FAILED:');
		console.error(err);
		next(err);
	}
});

// Gets all the players for the select screen
router.get('/players', async (req, res) => {
	try {
		const players = await getPlayers();

		res.send({ status: 'success', data: { players } });
	} catch (err) {
		console.error('GET PLAYERS FAILED:');
		console.error(err);
		next(err);
	}
});

// Calculates the chances of winning for 2 players
router.get('/chances-of-winning', (req, res) => {
	const { homeElo, awayElo } = req.query;

	const homeEloInt = parseInt(homeElo);
	const awayEloInt = parseInt(awayElo);

	const homeWinChance = calculateWinChance(homeEloInt, awayEloInt);

	const awayWinChance = calculateWinChance(awayEloInt, homeEloInt);

	res.json({ status: 'success', data: { homeWinChance, awayWinChance } });
});

module.exports = router;
