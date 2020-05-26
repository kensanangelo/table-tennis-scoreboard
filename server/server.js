const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.send({ express: 'Hello From Express' });
});

app.post('/api/submit-game', (req, res) => {
   console.log(req.body.winner);
   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.send(
		`I received your POST request. This is what you sent me:`,
   );
});

app.listen(port, () => console.log(`Listening on port ${port}`));