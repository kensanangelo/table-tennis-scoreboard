import axios from 'axios';
import apiInfo from '../../config';

// Hits API to make sure we are able to reach it
export const callApi = async () => {
	var config = {
		method: 'get',
		url: apiInfo.checkUrl,
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const response = await axios(config);
		const result = response.data;

		if (result.status === 'success') {
			return result.data.msg;
		}

		throw 'Cannot connect to server';
	} catch (error) {
		console.log(error);
	}
};

// Sends the game results to the server to log in the DB
export const sendGameReport = async (state) => {
	const response = await fetch(apiInfo.sendUrl, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
			token: apiInfo.serverToken,
		},
		body: JSON.stringify(state),
	});

	const body = await response.json();

	if (response.status !== 200) throw Error(body.message);

	return body.message;
};

// Gets all available players
export const getPlayers = async () => {
	const response = await fetch(apiInfo.playersUrl, {
		method: 'get',
		headers: {
			'Content-Type': 'application/json',
			token: apiInfo.serverToken,
		},
	});

	if (response.ok) {
		const body = await response.json();

		if (response.status !== 200) console.log(body.message);

		return body.data.players;
	} else {
		console.log(`Error: ${response.statusText}`);
	}
};

// Gets all games
export const getStats = async () => {
	const response = await fetch(apiInfo.statsUrl, {
		method: 'get',
		headers: {
			'Content-Type': 'application/json',
			token: apiInfo.serverToken,
		},
	});

	if (response.ok) {
		const body = await response.json();

		if (response.status !== 200) console.log(body.message);
		return body.games;
	} else {
		console.log(`Error: ${response.statusText}`);
	}
};
