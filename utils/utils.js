const config = require('../config.json');

function sendError(res, code, data) {
	res.status(code).send(data);
}

module.exports = {
	checkToken: function (req, res, next) {
		let token = '';

		if(req.method === 'POST'){
			token = req.body.token;
		}else{
			token = req.query.token;
		}

		if(token === config.serverToken){
			next();
			return;
		}else{
			console.log("\x1b[31m", `REQ REJECTED: BAD TOKEN`);
			sendError(res, 401, {message: 'Bad token. Permission denied'})
		}
	},

	submitGametoDB: async function (gamesCollection, rawData) {
		
		const insertData = {
			plays: rawData.plays,
			winner: {
				player_id: rawData.winner.id,
				name: rawData.winner.name
			},
			home: {
				player_id: rawData.home.id,
				name: rawData.home.name,
				score: rawData.home.score,
			},
			away: {
				player_id: rawData.away.id,
				name: rawData.away.name,
				score: rawData.away.score
			}
		}

		try{
			const result = await gamesCollection.insertOne(insertData)

			return '200';
		}catch(error){
			console.log("\x1b[31m", "GAME INSERT ERROR:");
			console.error(error);

			return error;
		}
	},

	getPlayers: async function (playersCollection){
		try{
			const players = await playersCollection.find().toArray();
			
			return players;
		}catch(error){
			console.log("\x1b[31m", "Players Get ERROR:");
			console.error(error);

			return error;
		}
	},

	sendResponse: function (res, data) {

		// Sticks CORS headers on so it can work in dev environment
		// TODO Maybe delete or auto-hide in production
		res.header("Access-Control-Allow-Origin", "http://localhost:3000");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.send(data);
	},

	sendError: sendError
};