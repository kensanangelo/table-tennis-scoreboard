# BV Scoreboard
## About
Built on the MERN stack, this will be run on a Raspberry Pi on the TV next to the table to track games. 2 USB paddle buttons will be mapped to Z and P for each player.

## Setup
- You have to run npm install in /client and /server separately before using any commands (they have separate node_module folders)

## Scripts
- Run `npm run dev` to start both the react build and server with live reloading
- Run `npm run build` to build the react app for deployment

## TODO
- Set up mondoDB routes
- Store players in mongoDB
- Store games in mongoDB
- Set up other controls (maybe 'Hold R to reset game' or 'Press D+E+V for admin', etc)
- Style UI (Rob is designing)
- Add stats analysis