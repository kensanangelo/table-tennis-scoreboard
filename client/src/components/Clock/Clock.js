import React from 'react';

// Basic clock that shows the current time
// so people can get back to work if they need to
export default class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
		};
	}

	componentDidMount() {
		this.intervalID = setInterval(
			() => this.tick(),
			1000
		);
	}

	componentWillUnmount() {
		clearInterval(this.intervalID);
	}

	tick() {
		this.setState({
			time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).split(" ").join(""),
		});
	}

	render() {
		return (
			<p className="clock">
				{this.state.time}
			</p>
		);
	}
}