module.exports = {
	submitGametoDB: async function (gamesCollection, rawData) {
		console.log(rawData);
		
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
		}catch{
			console.log("GAME INSERT ERROR:");
			console.error(error);

			return error;
		}
	},

	sendResponse: function (res, data) {
		res.header("Access-Control-Allow-Origin", "http://localhost:3000");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.send(data);
	}
};