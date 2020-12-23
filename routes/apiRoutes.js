const express = require('express');
const router = express.Router();

const { submitGametoDB, getPlayers, getStats } = require('../utils');
const { calculateWinChance } = require('../utils/eloCalculator');

const { checkToken } = require('../middleware/tokenAuth');

// Everything below here requires a token
router.use(checkToken);

router.get('/hello', (req, res) => {
	//* This is used to hit up the API to make sure it's responding correctly

	res.json({ status: 'success', data: { msg: 'API up and running' } });
});

// Submit a game to the DB, once it's over
router.post('/games', (req, res) => {
	submitGametoDB(req.body)
		.then((response) => {
			console.log('\x1b[32m', 'Game saved correctly');

			res.json({
				status: 'success',
				data: { message: `Game saved correctly.` },
			});
		})
		.catch((err) => {
			console.error('\x1b[31m', `DB ERROR: ${err}`);

			res.status(500).json({
				status: 'error',
				message: 'DB Insertion Failed. Reason: ' + err,
			});
		});
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
	console.log(req.query);
	const { homeElo, awayElo } = req.query;

	const homeWinChance = calculateWinChance(
		parseInt(homeElo),
		parseInt(awayElo)
	);

	const awayWinChance = calculateWinChance(
		parseInt(awayElo),
		parseInt(homeElo)
	);

	console.log('winChance: ', winChance);
	console.log('loseChance: ', loseChance);

	res.json({ status: 'success', data: { homeWinChance, awayWinChance } });
});

module.exports = router;
