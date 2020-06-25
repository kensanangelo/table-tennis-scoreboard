# BV Scoreboard
## About
Built on the MERN stack, the client files will be run on a small computer on the TV next to the ping pong table to track games. The server will be run as an API the local files connect to. 2 USB paddle buttons will be mapped to Z and P for each player, and a mouse will be used to set up the game.

## Setup
- You have to run npm install in root and /client separately before using any commands (they have separate node_module folders)
- To get players, you have to connect to the test DB
	- Copy the config-sample.json file to a new file called config.json
	- Replace the "connectionString" data with the one in "__TESTDB__URL"

## Scripts
- Run `npm start` to start both the react build and server with live reloading
- Run `npm run server` to only run the server with live reloading
- Run `npm run build` to build the react app for deployment
- Run `npm run prod` to run the server for the production environment

## TODO
- Add to game start screen
	- Show last 3/5/10 games somewhere
	- How many points to win & serving switch amount?
- Maybe a way to modify scores in game if someone messes up
- Add stats analysis
- Add date of game to DB so we can track seasons
- Implement ranking system
	- Probably going to use ELO using this node package
		- Starting ranking will probably be 1200
		- https://github.com/tlhunter/node-arpad

## Bugs
- Letter spacing needs to be tweaked (the letters 04 touch)
- Win screen image loads in slowly, thus causing pop-in.
	- Should be preloaded at beginning of game
- Need bold font files. Currently only has regular