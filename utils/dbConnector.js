var mongoose = require('mongoose');

class Database {
	constructor() {
		this._connect();
	}

	_connect() {
		mongoose
			.connect(process.env.CONNECTION_STRING, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() => {
				console.log(
					'\x1b[44m\x1b[37m',
					'Connected to Database',
					'\x1b[0m\n'
				);
			})
			.catch((err) => {
				console.error('DATABASE CONNECTION ERROR: ');
				console.error(err);
			});
	}
}

module.exports = new Database();
