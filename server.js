require('dotenv').config();
const app = require('./app');

const generateTerminalEffect = require('./utils/terminal-effect-generator');

global.APP_DIR = __dirname;
const port = process.env.PORT || 5000;

app.listen(port, () =>
	console.log('\x1b[46m\x1b[30m', `Listening on port ${port}`, '\x1b[0m')
);

generateTerminalEffect();
