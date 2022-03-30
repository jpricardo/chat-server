'use strict';
// import Tabs from './Tabs.js';
import Chat from './ChatApp.js';

interface IProps {}

interface IState {
	socket: any;
	username: string;
}
class App extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);
		let username: string;
		while (!username) {
			username = window.prompt('Qual seu nome?');
		}
		const socket = io();

		this.state = {
			socket: socket,
			username: username,
		};
	}
	render() {
		const messages: {
			data: string;
			type: string;
			name?: string;
			timeStamp?: string;
		}[] = [
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
