'use strict';

interface IMessage {
	data: string;
	type: string;
	name?: string;
	timeStamp?: string;
}

interface IProps {
	value: string;
	handleSubmit: any;
	handleChange: any;
}

interface IState {
	value: string;
}

class InputForm extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = { value: this.props.value };
		// this.handleChange = this.handleChange.bind(this);
		// this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps: IProps) {
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
					autoComplete={'off'}
					onChange={this.props.handleChange}
				/>
				<button type={'submit'} className={'btn-primary'}>
					Enviar
				</button>
			</form>
		);
	}
}

export default InputForm;
