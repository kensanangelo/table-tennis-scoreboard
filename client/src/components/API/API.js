import axios from 'axios';
import apiInfo from '../../config';

// Hits API to make sure we are able to reach it
export const callApi = async () => {
	const config = {
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
	const data = { ...state };
	const config = {
		method: 'post',
		url: apiInfo.sendUrl,
		headers: {
			'Content-Type': 'application/json',
			token: apiInfo.serverToken,
		},
		data,
	};

	try {
		const response = await axios(config);
		const result = response.data;

		if (result.status === 'success') {
			return result.data.data.msg;
		} else {
			console.error(result.data.message);
			alert('COULD NOT SEND GAME TO SERVER');
		}
	} catch (error) {
		console.log(error);
	}
};

// Gets all available players
export const getPlayers = async () => {
	const config = {
		method: 'get',
		url: apiInfo.playersUrl,
		headers: {
			'Content-Type': 'application/json',
			token: apiInfo.serverToken,
		},
	};

	try {
		const response = await axios(config);
		const result = response.data;

		if (result.status === 'success') {
			return result.data.players;
		} else {
			console.error(result.data.message);
			alert('COULD NOT GET PLAYERS');
		}
	} catch (error) {
		console.log(error);
	}
};

// Gets all games
export const getStats = async () => {
	const config = {
		method: 'get',
		url: apiInfo.statsUrl,
		headers: {
			'Content-Type': 'application/json',
			token: apiInfo.serverToken,
		},
	};

	try {
		const response = await axios(config);
		const result = response.data;

		if (result.status === 'success') {
			return result.data.games;
		} else {
			console.error(result.message);
			alert('COULD NOT SEND GAME TO SERVER');
		}
	} catch (error) {
		console.log(error);
	}
};
