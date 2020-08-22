var Elo = require('arpad');

var uscf = {
	default: 32,
	2100: 24,
	2400: 16,
};

var min_score = 100;
var max_score = 10000;

var elo = new Elo(uscf, min_score, max_score);

var alice = 3000;
var bob = 2700;

var odds_alice_wins = elo.expectedScore(alice, bob);
console.log(
	'The odds of Alice winning are about:',
	(odds_alice_wins * 100).toFixed(2)
); // ~2.9%
alice = elo.newRating(odds_alice_wins, 1.0, alice);
console.log("Alice's new rating after she won:", alice); // 2121

odds_alice_wins = elo.expectedScore(alice, bob);
console.log(
	'The odds of Alice winning again are about:',
	(odds_alice_wins * 100).toFixed(2)
); // ~3.4%
alice = elo.newRating(odds_alice_wins, 1.0, alice);
console.log("Alice's new rating if she won again:", alice); // 2144
