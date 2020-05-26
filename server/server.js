const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
   // For now, returns a success message
   // TODO return useful info from DB
   sendResponse(res, { express: 'Test Request' });
});

app.post('/api/submit-game', (req, res) => {
   //Checks if client sent correct token
   if(req.body.token === config.serverToken){
      sendResponse(res, {message: `I received your POST request.`});
   }else{
      res.status(501)
         .send({message: 'Bad token. Permission denied'});
   }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

//Builds and sends successful response
//Includes CORS header because Chrome is a poopface if we don't
const sendResponse = (res, data) => {
   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.send(data);
}