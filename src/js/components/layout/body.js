import React from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';

import store from '../../store.js';
import Week from '../week.js';
import Login from '../login.js';

class Body extends React.Component {
	
	render(){

		return this.props.route.name.startsWith('week') ? (<Week />) : (<Login />);
		
	}
	
}

const mapStateToProps = state => {
	
	return routeNodeSelector('');

};

export default connect(mapStateToProps)(Body);