import apiInfo from '../../config';

// For now, get's back a message to test api
// TODO Have api return info that we actually need for stats/player login
export const callApi = async () => {
	const response = await fetch('/api/hello');
	const body = await response.json();
	
	if (response.status !== 200) throw Error(body.message);
	
	return body;
};

// Sends the game results to the server to log in the DB
export const sendGameReport = async (state) => {
	state.token = apiInfo.serverToken;

	const response = await fetch(apiInfo.sendUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(state),
	});
	
	const body = await response.json();
	
	if (response.status !== 200) throw Error(body.message);
	
	return body.message;
};


// Gets all available players
export const getPlayers = async () => {
	const data = {
		token: apiInfo.serverToken
	};

	const response = await fetch(apiInfo.playersUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	if(response.ok){
		const body = await response.json();
		
		if (response.status !== 200) throw Error(body.message);

		return body.players;
	}else{
		throw Error(response.statusText)
	}
	
};