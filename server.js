const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const generateTerminalEffect = require('./utils/terminal-effect-generator');

const {
	checkToken,
	sendError,
	sendResponse,
	submitGametoDB,
	getPlayers,
	getStats,
} = require('./utils/utils');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Sets static folder public so client can access js and css files
app.use(
	'/client/build/static',
	express.static(__dirname + '/client/build/static')
);

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

		app.post('/api/submit-game', checkToken, (req, res) => {
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

		app.post('/api/get-stats', checkToken, (req, res) => {
			getStats(gamesCollection, playersCollection).then((games, players) => {
				console.log('\x1b[32m', 'Req: Retrieved all games');
				sendResponse(res, { status: 200, games, players });
			});
		});

		app.post('/api/get-players', checkToken, (req, res) => {
			getPlayers(playersCollection).then((players) => {
				console.log('\x1b[32m', 'Req: Retrieved all players');
				sendResponse(res, { status: 200, players });
			});
		});
	}
);

app.get('/api/hello', (req, res) => {
	//* This is used to hit up the API to make sure it's responding correctly
	sendResponse(res, { msg: 'Connected to API' });
});

//! Maybe delete this?
//! Depends on if client can access server to get client files
//! or if they have to be on comp separately
app.get('/', checkToken, function (req, res) {
	console.log('Req: Client files sent');

	res.sendFile(__dirname + '/client/build/index.html');
});

app.listen(port, () =>
	console.log('\x1b[46m\x1b[30m', `Listening on port ${port}`, '\x1b[0m')
);

generateTerminalEffect();
