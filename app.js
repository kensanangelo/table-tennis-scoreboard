const express = require('express');
require('dotenv').config();
const morgan = require('morgan');

const router = require('./routes/routes');
const app = express();
const database = require('./utils/dbConnector');

app.use(morgan('common'));

app.use('/', router);

module.exports = app;
