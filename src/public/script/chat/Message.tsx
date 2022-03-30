'use strict';

interface IProps {
	className: string;
	text: string;
}

interface IState {}

class Message extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);
	}

	render() {
		return <li className={this.props.className}>{this.props.text}</li>;
	}
}

export default Message;
