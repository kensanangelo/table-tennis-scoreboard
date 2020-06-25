const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

const 
{ 
   checkToken,
   sendError, 
   sendResponse, 
   submitGametoDB, 
   getPlayers 
} = require("./utils")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Sets static folder public so client can access js and css files
app.use('/client/build/static', express.static(__dirname + '/client/build/static'))

// Connects to DB
//* All of the API calls that need the DB go in here
const MongoClient = require('mongodb').MongoClient
MongoClient.connect(config.connectionString, {
   useUnifiedTopology: true
}, (err, client) => {
   if (err) return console.error(err)
   console.log('Connected to Database')

   const db = client.db('scoreboard')
   const playersCollection = db.collection('players')
   const gamesCollection = db.collection('games')

   app.post('/api/submit-game', checkToken, (req, res) => {
      submitGametoDB(gamesCollection, req.body)
      .then(response => {

         if(response === '200'){
            sendResponse(res, {status: 200, message: `Game saved correctly.`});
         }else{
            sendError(res, 500, {message: 'DB Insertion Failed. Reason: ' + response.errmsg})
         }

      });
   });

   app.post('/api/get-players', checkToken, (req, res) => {
      getPlayers(playersCollection)
      .then(players => {
         sendResponse(res, {status: 200, players: players});
      });
   });
})

app.get('/api/hello', (req, res) => {
   //* This is used to hit up the API to make sure it's responding correctly
   sendResponse(res, { msg: 'Connected to API' });
});

//! Maybe delete this?
//! Depends on if client can access server to get client files 
//! or if they have to be on comp separately
app.get('/', checkToken, function(req, res) {
   res.sendFile(__dirname + '/client/build/index.html')
});

app.listen(port, () => console.log(`Listening on port ${port}`));