const path = require('path');
const express = require('express');
const router = express.Router();

const config = require('../config.json');

const { rankGames } = require('../utils/eloCalculator');

const {
	checkToken,
	sendError,
	sendResponse,
	submitGametoDB,
	getPlayers,
	getGames,
	getStats,
} = require('../utils/utils');

// Connects to DB
//* All of the API calls that need the DB go in here
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(
	config.connectionString,
	{
		useUnifiedTopology: true,
	},
	(err, client) => {
		if (err) return console.error(err);
		console.log('\x1b[44m\x1b[37m', 'Connected to Database', '\x1b[0m\n');

		const db = client.db('scoreboard');
		const playersCollection = db.collection('players');
		const gamesCollection = db.collection('games');

		router.post('/submit-game', checkToken, (req, res) => {
			submitGametoDB(gamesCollection, req.body).then((response) => {
				if (response === '200') {
					console.log('\x1b[32m', 'Game saved correctly');

					sendResponse(res, {
						status: 200,
						message: `Game saved correctly.`,
					});
				} else {
					console.log('\x1b[31m', `DB ERROR: ${response.errmsg}`);

					sendError(res, 500, {
						message: 'DB Insertion Failed. Reason: ' + response.errmsg,
					});
				}
			});
		});

		router.post('/get-stats', checkToken, (req, res) => {
			getStats(gamesCollection, playersCollection).then((games, players) => {
				console.log('\x1b[32m', 'Req: Retrieved all games');
				sendResponse(res, { status: 200, games, players });
			});
		});

		router.post('/get-players', checkToken, (req, res) => {
			getPlayers(playersCollection).then((players) => {
				console.log('\x1b[32m', 'Req: Retrieved all players');
				sendResponse(res, { status: 200, players });
			});
		});

		router.get('/test-elo', checkToken, async (req, res) => {
			const players = await getPlayers(playersCollection);
			const games = await getGames(gamesCollection);

			const results = await rankGames(players, games);

			sendResponse(res, { status: 200, results });
		});
	}
);

router.get('/hello', (req, res) => {
	//* This is used to hit up the API to make sure it's responding correctly
	sendResponse(res, { msg: 'Connected to API' });
});

module.exports = router;
