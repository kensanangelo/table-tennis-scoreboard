const express = require('express');
const router = express.Router();

const { submitGametoDB, getPlayers, getStats } = require('../utils/utils');

const { checkToken } = require('../middleware/tokenAuth');

// let db;
// let playersCollection;
// let gamesCollection;

// // Connects to DB
// //* All of the API calls that need the DB go in here
// const MongoClient = require('mongodb').MongoClient;
// MongoClient.connect(
// 	process.env.CONNECTION_STRING,
// 	{
// 		useUnifiedTopology: true,
// 	},
// 	(err, client) => {
// 		if (err) return console.error(err);
// 		console.log('\x1b[44m\x1b[37m', 'Connected to Database', '\x1b[0m\n');

// 		db = client.db('scoreboard');
// 		playersCollection = db.collection('players');
// 		gamesCollection = db.collection('games');
// 	}
// );

router.get('/hello', (req, res) => {
	//* This is used to hit up the API to make sure it's responding correctly

	res.json({ status: 'success', data: { msg: 'API up and running' } });
});

router.post('/games', checkToken, (req, res) => {
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

// router.get('/stats', checkToken, (req, res) => {
// 	getStats(gamesCollection, playersCollection).then((games, players) => {
// 		res.send({ status: 'success', data: { games, players } });
// 	});
// });

router.get('/players', checkToken, (req, res) => {
	getPlayers().then((players) => {
		res.send({ status: 'success', data: { players } });
	});
});

module.exports = router;
