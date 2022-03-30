'use strict';
class TabBody extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <h3>Tab {this.props.content}</h3>;
	}
}

class TabButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<button className={this.props.active ? 'btn-primary' : 'btn-secondary'}>
				{this.props.title}
			</button>
		);
	}
}

class Tabs extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const navigation: TabButton[] = this.props.buttons.map(
			(
				button: { label: string; title: string; ative?: boolean },
				i: number
			) => {
				return (
					<TabButton
						active={i === 0}
						label={button.label}
						title={button.title}
					/>
				);
			}
		);
		const tabs: TabBody[] = this.props.tabs.map(
			(tab: { label: string; content: string }) => {
				return <TabBody label={tab.label} content={tab.content} />;
			}
		);
		return (
			<React.Fragment>
				<nav>{navigation}</nav>
				<div>{tabs}</div>
			</React.Fragment>
		);
	}
}

export default Tabs;
