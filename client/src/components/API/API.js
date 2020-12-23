import axios from 'axios';

const headers = {
	'Content-Type': 'application/json',
	token: process.env.REACT_APP_SERVER_TOKEN,
};

// Hits API to make sure we are able to reach it
export const callApi = async () => {
	const config = {
		method: 'get',
		url: process.env.REACT_APP_SERVER_URL + '/hello',
		headers: headers,
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
		url: process.env.REACT_APP_SERVER_URL + '/games',
		headers: headers,
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
		url: process.env.REACT_APP_SERVER_URL + '/players',
		headers: headers,
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
		url: process.env.REACT_APP_SERVER_URL + '/stats',
		headers: headers,
	};

	try {
		const response = await axios(config);
		const result = response.data;

		if (result.status === 'success') {
			return result.data.stats;
		} else {
			console.error(result.message);
			alert('COULD NOT GET STATS FROM TO SERVER');
		}
	} catch (error) {
		console.log(error);
	}
};

export const getWinChances = async (homeElo, awayElo) => {
	const config = {
		method: 'get',
		url: process.env.REACT_APP_SERVER_URL + '/chances-of-winning',
		params: { homeElo, awayElo },
		headers: headers,
	};

	try {
		const response = await axios(config);
		const result = response.data;

		if (result.status === 'success') {
			return result.data.stats;
		} else {
			console.error(result.message);
			alert('COULD NOT GET STATS FROM TO SERVER');
		}
	} catch (error) {
		console.log(error);
	}
};
