module.exports = {
	submitGametoDB: async function (gamesCollection, rawData) {
		
		const insertData = {
			plays: rawData.plays,
			winner: rawData.winner,
			home: {
				name: rawData.home.name,
				score: rawData.home.score,
			},
			away: {
				name: rawData.away.name,
				score: rawData.away.score
			}
		}

		try{
			const result = await gamesCollection.insertOne(insertData)

			return '200';
		}catch(error){
			console.log("GAME INSERT ERROR:");
			console.error(error);

			return error;
		}
	},

	getPlayers: async function (playersCollection){
		try{
			const players = await playersCollection.find().toArray();
			console.log(players);
			
			return players;
		}catch(error){
			console.log("Players Get ERROR:");
			console.error(error);

			return error;
		}
	},

	sendResponse: function (res, data) {
		res.header("Access-Control-Allow-Origin", "http://localhost:3000");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.send(data);
	},

	sendError: function (res, code, data) {
		res.status(code).send(data);
	}
};