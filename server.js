const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
const utils = require("./utils")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Sets build folder public so client can access js and css files
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

   app.post('/api/submit-game', (req, res) => {
      //Checks if client sent correct token
      if(req.body.token === config.serverToken){

         utils.submitGametoDB(gamesCollection, req.body)
         .then(response => {
   
            if(response === '200'){
               utils.sendResponse(res, {status: 200, message: `Game saved correctly.`});
            }else{
               utils.sendError(res, 500, {message: 'DB Insertion Failed. Reason: ' + response.errmsg})
            }

         });


      }else{
         utils.sendError(res, 501, {message: 'Bad token. Permission denied'})
      }
   });

   app.post('/api/get-players', (req, res) => {
      //Checks if client sent correct token
      if(req.body.token === config.serverToken){

         utils.getPlayers(playersCollection)
         .then(players => {
            utils.sendResponse(res, {status: 200, players: players});
         });

      }else{
         utils.sendError(res, 501, {message: 'Bad token. Permission denied'})
      }
   });

   //!!!!!!!!!!!!!!!!!!
   // TODO DELETE THIS
   //!!!!!!!!!!!!!!!!!!
   app.get('/api/player-check', (req, res) => {

      utils.getPlayers(playersCollection)
      .then(players => {
         utils.sendResponse(res, {players: players});
      })
      
   });
})

app.get('/api/hello', (req, res) => {
   //* This is used to hit up the API to make sure it's responding correctly
   utils.sendResponse(res, { msg: 'Connected to API' });
});

app.get('/', function(req, res) {
   res.sendFile(__dirname + '/client/build/index.html')
});

app.listen(port, () => console.log(`Listening on port ${port}`));