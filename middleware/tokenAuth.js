exports.checkToken = (req, res, next) => {
	let token = '';
	token = req.headers['token'];

	if (token === process.env.SERVER_TOKEN) {
		next();
		return;
	} else {
		console.log('\x1b[31m', `REQ REJECTED: BAD TOKEN`);
		return res
			.status(401)
			.json({ status: 'failure', message: 'Bad token. Permission denied' });
	}
};

exports.checkClientToken = (req, res, next) => {
	let token = '';
	token = req.query.token;

	if (token === process.env.SERVER_TOKEN) {
		next();
		return;
	} else {
		console.log('\x1b[31m', `REQ REJECTED: BAD TOKEN`);
		return res
			.status(401)
			.json({ status: 'failure', message: 'Bad token. Permission denied' });
	}
};
