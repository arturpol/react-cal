import React from 'react';

import utils from '../../helpers/utils.js';

class Event extends React.Component {
	
	constructor(props){
		
		super(props);
		this.state = { content: '', style: {} };
		
	}
	
	static getDerivedStateFromProps(nextProps, prevState){
		
		let { data } = nextProps;
		if(!data) return null;
		
		let imp = ' !important';
		let content = data.summary;
		let style = { backgroundColor: data.backgroundColor, color: data.foregroundColor };
		
		return { ...prevState, content, style };
		
	}
	
	render(){
		
		return (
			<div class="event" style={this.state.style}>{this.state.content}</div>
		);
		
	}
	
}

export default Event;