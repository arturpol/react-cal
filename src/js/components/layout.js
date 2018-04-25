import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from './layout/header.js';
import Body from './layout/body.js';
import { initialize } from '../actions/actions.js';

class Layout extends React.Component {
	
	componentDidMount(){
		
		this.props.initialize();

	}
	
	render(){
		
		return (
			<div class="layout grid-y grid-frame">
				<Header title={this.props.title} />
				<Body />
			</div>
		);
		
	}
	
}


const mapStateToProps = state => {
	
	return {
		// to do
	};

};

const mapDispatchToProps = dispatch => {
	
	return bindActionCreators({
		initialize
	}, dispatch);
	
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);