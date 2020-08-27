const express = require('express');
require('dotenv').config();
const morgan = require('morgan');

const router = require('./routes/routes');

const generateTerminalEffect = require('./utils/terminal-effect-generator');

global.APP_DIR = __dirname;

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('dev'));

app.use('/', router);

app.listen(port, () =>
	console.log('\x1b[46m\x1b[30m', `Listening on port ${port}`, '\x1b[0m')
);

generateTerminalEffect();
