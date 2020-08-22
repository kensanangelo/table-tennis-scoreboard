const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const generateTerminalEffect = require('./utils/terminal-effect-generator');

const config = require('./config');
const apiRouter = require('./routes/apiRouter');

const { checkToken } = require('./utils/utils');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Sets static folder public so client can access js and css files
app.use(
	'/client/build/static',
	express.static(__dirname + '/client/build/static')
);

app.use('/api', apiRouter);

//! Maybe delete this?
//! Depends on if client can access server to get client files
//! or if they have to be on comp separately
app.get('/', checkToken, function (req, res) {
	console.log('Req: Client files sent');

	res.sendFile(__dirname + '/client/build/index.html');
});

app.listen(port, () =>
	console.log('\x1b[46m\x1b[30m', `Listening on port ${port}`, '\x1b[0m')
);

generateTerminalEffect();
