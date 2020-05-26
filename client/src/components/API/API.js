import apiInfo from '../../config';

export const callApi = async () => {
	const response = await fetch('/api/hello');
	const body = await response.json();
	
	if (response.status !== 200) throw Error(body.message);
	
	return body;
};


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