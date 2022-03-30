'use strict';

class Message extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <li className={this.props.className}>{this.props.text}</li>;
	}
}

class Messages extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: this.props.content,
			username: this.props.username,
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState(nextProps);
	}

	listarMensagens(messages) {
		return messages.map(
			(item: { data: string; type: string; name?: string }) => {
				const className =
					item.type === 'info'
						? 'info'
						: item.name === this.state.username
						? ''
						: 'dark';
				const text =
					item.type === 'message'
						? `[${item.timeStamp}] ${item.name} >> ${item.data}`
						: `${item.data}`;

				return <Message text={text} className={className} />;
			}
		);
	}

	render() {
		const messages = this.listarMensagens(this.state.content);
		return <ul id="messages">{messages}</ul>;
	}
}

class InputForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: this.props.value };
		// this.handleChange = this.handleChange.bind(this);
		// this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(nextProps);
	}

	// handleSubmit(e) {
	// 	this.props.handleSubmit(e, this);
	// }

	render() {
		return (
			<form id={'form'} onSubmit={this.props.handleSubmit}>
				<input
					value={this.state.value}
					id={'input'}
					autocomplete={'off'}
					onChange={this.props.handleChange}
				/>
				<button type={'submit'} className={'btn-primary'}>
					Enviar
				</button>
			</form>
		);
	}
}

class Chat extends React.Component {
	constructor(props) {
		super(props);
		const socket = this.props.socket;

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
			messages: this.props.messages,
			socket: socket,
			username: this.props.username,
			value: '',
		};
		this.onSubmit.bind(this);
		this.onChange.bind(this);
	}

	addItem(content: { data: string; name?: string; type: string }) {
		const messages = [...this.state.messages].concat([...[content]]);
		this.setState({ messages: messages });
		window.scrollTo(0, document.body.scrollHeight);
	}

	onChange(e) {
		this.setState({ value: event.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		const value = this.state.value;
		if (value !== '') {
			console.log('Submeteu!', value);
		}
		this.setState({ value: '' });
		this.state.socket.emit('chat message', { data: value, type: 'message' });
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

('estou exportando!');
export default Chat;
