import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signIn, signOut } from '../../../actions/actions.js';
import CalendarNav from './calendar-nav.js';

class TopMenu extends React.Component {
	
	render(){
		
		return (
			<div class="top-bar">
				<div class="top-bar-left">
					<CalendarNav title={this.props.title} />
				</div>
				{ this.props.isGoogleClientLoaded && <div class="top-bar-right">
					<ul class="menu">
						<li>
							{ this.props.isSignedIn ? 
								( <a onClick={this.props.signOut}>Sign out</a> )
							:
								( <a onClick={this.props.signIn}>Sign in</a> )
							}
						</li>
					</ul>
				</div> }
			</div>
		);
		
	}
	
}

const mapStateToProps = state => {
	
	return {
		isSignedIn: state.user.isSignedIn,
		isGoogleClientLoaded: (state.user.google ? true : false)
	};

};

const mapDispatchToProps = dispatch => {
	
	return bindActionCreators({
		signIn, 
		signOut
	}, dispatch);
	
};

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);