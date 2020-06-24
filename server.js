const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

const 
{ 
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

   app.post('/api/submit-game', (req, res) => {
      //Checks if client sent correct token
      if(req.body.token === config.serverToken){

         submitGametoDB(gamesCollection, req.body)
         .then(response => {
   
            if(response === '200'){
               sendResponse(res, {status: 200, message: `Game saved correctly.`});
            }else{
               sendError(res, 500, {message: 'DB Insertion Failed. Reason: ' + response.errmsg})
            }

         });


      }else{
         sendError(res, 501, {message: 'Bad token. Permission denied'})
      }
   });

   app.post('/api/get-players', (req, res) => {
      //Checks if client sent correct token
      if(req.body.token === config.serverToken){

         getPlayers(playersCollection)
         .then(players => {
            sendResponse(res, {status: 200, players: players});
         });

      }else{
         sendError(res, 501, {message: 'Bad token. Permission denied'})
      }
   });
})

app.get('/api/hello', (req, res) => {
   //* This is used to hit up the API to make sure it's responding correctly
   sendResponse(res, { msg: 'Connected to API' });
});

//! Maybe delete this?
//! Depends on if client can access server to get client files 
//! or if they have to be on comp separately
app.get('/', function(req, res) {
   if(req.query.token === config.serverToken){

      res.sendFile(__dirname + '/client/build/index.html')

   }else{
      sendError(res, 501, {message: 'Bad token. Permission denied'})
   }
});

app.listen(port, () => console.log(`Listening on port ${port}`));