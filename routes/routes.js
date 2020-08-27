const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const apiRouter = require('./apiRoutes');

const { checkClientToken } = require('../middleware/tokenAuth');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//Sets static folder public so client can access js and css files
router.use(
	'/',
	express.static(path.join(__dirname, '..', '/client/build/static'))
);

router.use('/api', apiRouter);

router.get('/', checkClientToken, function (req, res) {
	res.sendFile(path.join(__dirname, '..', '/client/build/index.html'));
});

router.use(function (req, res) {
	res.status(400).send({ status: 'failure', message: 'Bad request' });
});

module.exports = router;
