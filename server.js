const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
var path = require("path");
const app = express();
const port = process.env.PORT || 5000;

//Sets build folder public so client can access js and css files
app.use('/client/build', express.static(__dirname + '/client/build'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connects to DB
//* All of the API calls that need the DB go in here
const MongoClient = require('mongodb').MongoClient
MongoClient.connect(config.connectionString, {
   useUnifiedTopology: true
 }, (err, client) => {
   if (err) return console.error(err)
   console.log('Connected to Database')

   const db = client.db('scoreboard')

   app.post('/api/submit-game', (req, res) => {
      //Checks if client sent correct token
      if(req.body.token === config.serverToken){
         sendResponse(res, {message: `I received your POST request.`});
      }else{
         res.status(501)
            .send({message: 'Bad token. Permission denied'});
      }
   });
 })

app.get('/', function(req, res) {
   res.sendFile(__dirname + '/client/build/index.html')
});

app.get('/api/hello', (req, res) => {
   // For now, returns a success message
   // TODO return useful info from DB
   sendResponse(res, { express: 'Request Successful. The API is running' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

//Builds and sends successful response
//Includes CORS header because Chrome is a poopface if we don't
const sendResponse = (res, data) => {
   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.send(data);
}