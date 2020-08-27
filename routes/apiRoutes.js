const express = require('express');
const router = express.Router();

const {
	sendError,
	sendResponse,
	submitGametoDB,
	getPlayers,
	getStats,
} = require('../utils/utils');

const { checkToken } = require('../middleware/tokenAuth');

let db;
let playersCollection;
let gamesCollection;

// Connects to DB
//* All of the API calls that need the DB go in here
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(
	process.env.CONNECTION_STRING,
	{
		useUnifiedTopology: true,
	},
	(err, client) => {
		if (err) return console.error(err);
		console.log('\x1b[44m\x1b[37m', 'Connected to Database', '\x1b[0m\n');

		db = client.db('scoreboard');
		playersCollection = db.collection('players');
		gamesCollection = db.collection('games');
	}
);

router.get('/hello', (req, res) => {
	//* This is used to hit up the API to make sure it's responding correctly
	sendResponse(res, { msg: 'API up and running' });
});

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

router.get('/get-stats', checkToken, (req, res) => {
	getStats(gamesCollection, playersCollection).then((games, players) => {
		console.log('\x1b[32m', 'Req: Retrieved all games');
		sendResponse(res, { status: 200, games, players });
	});
});

router.get('/get-players', checkToken, (req, res) => {
	getPlayers(playersCollection).then((players) => {
		console.log('\x1b[32m', 'Req: Retrieved all players');
		res.send({ status: 'success', data: { players } });
	});
});

module.exports = router;
