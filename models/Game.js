let mongoose = require('mongoose');

let gameSchema = new mongoose.Schema({
	date: {
		type: Date,
		default: Date.now,
	},
	plays: {
		type: Number,
	},
	winner: {
		player_id: String,
		name: String,
	},
	home: {
		player_id: String,
		name: String,
		score: Number,
	},
	away: {
		player_id: String,
		name: String,
		score: Number,
	},
});

module.exports = mongoose.model('Game', gameSchema, 'games');
