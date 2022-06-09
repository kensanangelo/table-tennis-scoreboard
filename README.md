# Table Tennis Scoreboard

## About

This is a scoreboard for playing table tennis. It tracks individual players, their games and displays a leaderboard (using ELO ranking). The keys Z and P are mapped to each player, and the intention is for 2 USB paddles to be set up on either side of the table set to those keys, so the players can input when they score a point without leaving the table.

> Technical details: Built on the MERN stack, the client files will be run on a small computer on the TV next to the ping pong table to track games. The server will be run as an API the local files connect to. 2 USB paddle buttons will be mapped to Z and P for each player, and a mouse will be used to set up the game. The way it is set up now, you will need a db on MongoDB Atlas to host the data.

## Setup

-  Run `npm run install-all`
-  To get players, you have to connect to the test DB
-  Create a .env file in the root and put the following lines:
   -  `SERVER_TOKEN=*Any randomized string*`
   -  `CONNECTION_STRING=*Mongo DB url string*`
   -  `CURRENT_SEASON=1`

## Scripts

-  Run `npm start` to start both the react build and server with live reloading
-  Run `npm run server` to only run the server with live reloading
-  Run `npm run build` to build the react app for deployment
-  Run `npm run production` to run the server for the production environment

## TODO

-  Add ability to archived people who don't play anymore. Keep them in db for historical analysis
-  Who's serving should be next screen after setup (can be selected with paddles)
-  Add to game start screen - Show last 3/5/10 games somewhere - How many points to win & serving switch amount?
-  Maybe a way to modify scores in game if someone messes up
-  Add stats analysis/graphs/charts
-  Give the ability to look through past seasons on Leaderboard
-  Prevent double taps on the peddle buttons. Maybe set a timeout or a rate limit so a peddle can't register clicks more than once per 5 seconds.
-  Use DB \_id for tracking players instead of a dedicated player_id in games
-  Write a script to convert all current games in DB using player_id to \_id

## Bugs

-  Win screen image loads in slowly, thus causing pop-in.
   -  Should be preloaded at beginning of game
   -  (Doesn't matter right now as before and after images are the same)
