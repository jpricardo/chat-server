'use strict';

class Messages extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: this.props.content,
		};
	}

	listarMensagens(messages) {
		return messages.map(
			(item: { data: string; type: string; name?: string }) => {
				if (item.type === 'info') {
					return <li className={'info'}>{item.data}</li>;
				} else if ((item.type = 'message')) {
					return (
						<li className={item.name === this.state.username ? '' : 'dark'}>
							{item.name}
							{' >> '}
							{item.data}
						</li>
					);
				}
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
		this.state = { value: '' };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(e) {
		this.props.handleSubmit(e, this);
	}

	render() {
		return (
			<form id={'form'} onSubmit={this.handleSubmit}>
				<input
					value={this.state.value}
					id={'input'}
					autocomplete={'off'}
					onChange={this.handleChange}
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
		};
		this.onSubmit.bind(this);
	}

	addItem(content: { data: string; name?: string; type: string }) {
		const messages = [...this.state.messages].concat([...[content]]);
		this.setState({ messages: messages });
	}

	onSubmit(e, form) {
		e.preventDefault();
		console.log(this);
		const value = form.state.value;
		if (value !== '') {
			console.log('Submeteu!', value);
		}
		form.setState({ value: '' });
		this.state.socket.emit('chat message', { data: value, type: 'message' });
	}

	render() {
		return (
			<>
				<h2>{'Chat'}</h2>
				<Messages content={this.state.messages} />
				<InputForm handleSubmit={this.onSubmit} />
			</>
		);
	}
}

('estou exportando!');
export default Chat;
