const GameModel = require('../models/Game');
const PlayerModel = require('../models/Player');
const { calculateEloForWin, calculateEloForLose } = require('./eloCalculator');

module.exports = {
	submitGametoDB: async function (rawData) {
		const insertData = {
			plays: rawData.plays,
			date: new Date(),
			winner: {
				player_id: rawData.winner.id,
				name: rawData.winner.name,
			},
			home: {
				player_id: rawData.home.id,
				name: rawData.home.name,
				score: rawData.home.score,
			},
			away: {
				player_id: rawData.away.id,
				name: rawData.away.name,
				score: rawData.away.score,
			},
		};

		try {
			const result = await GameModel.create(insertData);

			return 'success';
		} catch (error) {
			console.log('\x1b[31m', 'GAME INSERT ERROR:');
			console.error(error);

			throw error;
		}
	},

	getStats: async function () {
		try {
			const players = await PlayerModel.find().lean();

			let games = await GameModel.find({
				date: { $gte: new Date('2020-08-30T00:00:00Z') },
			}).lean();

			let stats = [];

			players.map((player) => {
				let wins = 0;
				let losses = 0;
				let plays = 0;
				let overtime = 0;

				games.map((game) => {
					// Check to see if the player is in this game
					if (
						player.player_id === game.away.player_id ||
						player.player_id === game.home.player_id
					) {
						// Check to see if the winner is the player
						if (game.winner.player_id === player.player_id) {
							wins++;
						} else {
							losses++;
						}

						if (game.plays > plays) {
							plays = game.plays;
						}

						if (game.plays >= 21) {
							overtime++;
						}
					}
				});

				let winrate = (wins / (wins + losses)) * 100;

				if (winrate <= 0 || !winrate) {
					winrate = 0;
				} else {
					winrate = winrate.toFixed(0);
				}

				stats.push({
					player_id: player.player_id,
					name: player.name,
					elo: player.eloScore,
					wins: wins,
					losses: losses,
					winrate: winrate,
					plays: plays,
					overtime: overtime,
				});
			});

			stats.sort((a, b) => {
				//return b.winrate - a.winrate; // Sorting by winrate
				return b.elo - a.elo; // Sorting by elo score
			});

			return stats;
		} catch (error) {
			console.log('\x1b[31m', 'Games Get ERROR:');
			console.error(error);

			return error;
		}
	},

	getPlayers: async function () {
		try {
			const players = await PlayerModel.find().lean();

			return players;
		} catch (error) {
			console.log('\x1b[31m', 'Players Get ERROR:');
			console.error(error);

			return error;
		}
	},

	/**
	 * @param {String} playerId - The id for the player to be updated
	 * @param {Number} playerOldElo
	 * @param {Number} opponentOldElo
	 */
	updatePlayerElo: async function (
		playerId,
		playerOldElo,
		opponentOldElo,
		didWin
	) {
		try {
			const playerOldEloInt = parseInt(playerOldElo);
			const opponentOldEloInt = parseInt(opponentOldElo);
			let newElo = null;

			if (didWin) {
				newElo = calculateEloForWin(playerOldEloInt, opponentOldEloInt);
			} else {
				newElo = calculateEloForLose(playerOldEloInt, opponentOldEloInt);
			}

			if (newElo) {
				await PlayerModel.findOneAndUpdate(
					{ player_id: playerId },
					{ eloScore: newElo }
				);
			} else {
				console.log('NO NEW ELO');
				throw 'Unable to calculate new elo';
			}
		} catch (err) {
			console.error(err);
			throw new Error('Unable to calculate new elo');
		}
	},
};
