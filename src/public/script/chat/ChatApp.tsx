'use strict';
import Messages from './Messages.js';
import InputForm from './InputForm.js';

interface IMessage {
	data: string;
	type: string;
	name?: string;
	timeStamp?: string;
}

interface IProps {
	socket: any;
	username: string;
	messages: IMessage[];
}

interface IState {
	socket: any;
	messages: IMessage[];
	username: string;
	value: string;
}

class Chat extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);
		const socket = this.props.socket;
		const username = this.props.username;
		const messages = this.props.messages;

		socket.on('connect', () => {
			const credentials = { name: this.props.username, userId: socket.id };
			socket.emit('setId', credentials);
		});

		socket.on('left', (content) => {
			this.addItem(content);
		});

		socket.on('joined', (content) => {
			this.addItem(content);
		});

		socket.on('chat message', (content) => {
			this.addItem(content);
		});

		this.state = {
			messages: messages,
			socket: socket,
			username: username,
			value: '',
		};
		this.onSubmit.bind(this);
		this.onChange.bind(this);
	}

	addItem(content: IMessage) {
		const messages = [...this.state.messages].concat([...[content]]);
		this.setState({ messages: messages });
		window.scrollTo(0, document.body.scrollHeight);
	}

	onChange(e: Event) {
		this.setState({ value: event.target.value });
	}

	onSubmit(e: Event) {
		e.preventDefault();
		const value: string = this.state.value;
		if (value) {
			console.log('Submeteu!', value);
			this.state.socket.emit('chat message', { data: value, type: 'message' });
			this.setState({ value: '' });
		}
	}

	render() {
		return (
			<React.StrictMode>
				<Messages
					username={this.state.username}
					content={this.state.messages}
				/>
				<InputForm
					value={this.state.value}
					handleChange={(e) => this.onChange(e)}
					handleSubmit={(e) => this.onSubmit(e)}
				/>
			</React.StrictMode>
		);
	}
}

export default Chat;
