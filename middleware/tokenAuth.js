exports.checkToken = (req, res, next) => {
	const token = req.headers['token'];

	if (token === process.env.SERVER_TOKEN) {
		next();
		return;
	} else {
		console.log('\x1b[31m', `REQ REJECTED: BAD TOKEN`);
		return res
			.status(401)
			.json({ status: 'fail', message: 'Bad token. Permission denied' });
	}
};

exports.checkClientToken = (req, res, next) => {
	const token = req.query.token;

	if (token === process.env.SERVER_TOKEN) {
		next();
		return;
	} else {
		console.log('\x1b[31m', `REQ REJECTED: BAD TOKEN`);
		return res
			.status(401)
			.json({ status: 'fail', message: 'Bad token. Permission denied' });
	}
};
