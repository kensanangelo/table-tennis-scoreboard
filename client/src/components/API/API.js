import apiInfo from '../../config';

// Hits API to make sure we are able to reach it
export const callApi = async () => {
	const response = await fetch(apiInfo.checkUrl);
	const body = await response.json();
	
	if (response.status !== 200) throw Error(body.message);
	
	return body.msg;
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
		
		if (response.status !== 200) console.log(body.message);

		return body.players;
	}else{
		console.log(`Error: ${response.statusText}`);
	}
	
};