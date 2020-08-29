let mongoose = require('mongoose');

let playerSchema = new mongoose.Schema({
	player_id: String,
	name: String,
	elo: {
		type: Number,
		default: 1200,
	},
});

module.exports = mongoose.model('Player', playerSchema, 'players');
