'use strict';

import Message from './Message.js';

interface IMessage {
	data: string;
	type: string;
	name?: string;
	timeStamp?: string;
}

interface IProps {
	username: string;
	content: IMessage[];
}

interface IState {
	content: IMessage[];
	username: string;
}

class Messages extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);
		const content = this.props.content;
		const username = this.props.username;
		this.state = {
			content: content,
			username: username,
		};
	}

	componentWillReceiveProps(nextProps: IProps) {
		this.setState(nextProps);
	}

	listarMensagens(messages: IMessage[]) {
		return messages.map((item) => {
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
		});
	}

	render() {
		const messages = this.listarMensagens(this.state.content);
		return <ul id="messages">{messages}</ul>;
	}
}

export default Messages;
