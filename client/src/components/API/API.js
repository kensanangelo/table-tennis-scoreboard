export const callApi = async () => {
	const response = await fetch('/api/hello');
	const body = await response.json();
	
	if (response.status !== 200) throw Error(body.message);
	
	return body;
};

export const sendGameReport = (state) => {
	let msg = '';

	sendToAPI(state)
		.then(body => { msg = body; })
		.catch(err => { msg = err; });

	return msg;
};

const sendToAPI = async (state) => {
	const response = await fetch('/api/submit-game', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(state),
	});
	const body = await response.text();
	
	return body;
}