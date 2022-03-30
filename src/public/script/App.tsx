'use strict';
// import Tabs from './Tabs.js';
import Chat from './ChatApp.js';

class App extends React.Component {
	constructor(props) {
		super(props);
		let username: string;
		while (!username) {
			username = window.prompt('Qual seu nome?');
		}
		const socket = io();

		// socket.on('online', (val) => {
		// 	online.textContent = ` - ${val.data} Online`;
		// });

		this.state = {
			socket: socket,
			username: username,
		};
	}
	render() {
		const messages = [
			{
				type: 'info',
				data: `Bem vindo, ${this.state.username}`,
			},
		];
		return (
			<Chat
				socket={this.state.socket}
				username={this.state.username}
				messages={messages}
			/>
		);
	}
}

const root = document.getElementById('app-root');
ReactDOM.render(<App />, root);
