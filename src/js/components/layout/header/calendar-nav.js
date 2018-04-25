import React from 'react';
import { connect } from 'react-redux';
import { Button, Colors } from 'react-foundation';
import { bindActionCreators } from 'redux';
import { actions as routerActions } from 'redux-router5';

import { setTimeZone } from '../../../actions/actions.js';
import utils from '../../../helpers/utils.js';

class CalendarNav extends React.Component {
	
	constructor(props){
		
		super(props);
		this.state = { timeZone: props.timeZone };
		
	}
	
	static getDerivedStateFromProps(nextProps, prevState){
		
		return nextProps.timeZone == prevState.timeZone ? null : { ...prevState, timeZone: nextProps.timeZone };
		
	}
	
	setWeek(shift){
		
		this.props.dispatch(routerActions.navigateTo('week.selected', { 
			week: utils.weekToDate(utils.getWeek(shift ? this.props.week : new Date(), shift)) 
		}));
		
	}
	
	onSubmit(e){
		
		e.preventDefault();
		this.props.dispatch(setTimeZone(this.state.timeZone));
		
	}
	
	onTimeZoneChange(e){
		
		this.setState({ ...this.state, timeZone: e.target.value });
		
	}
	
	render(){
		
		return (
			<ul class="menu">
				<li class="menu-text">{this.props.title}</li>
				{ this.props.isSignedIn && <li><Button color={Colors.SECONDARY} onClick={ () => this.setWeek(-1) }><i class="fa fa-chevron-left"></i></Button></li> }
				{ this.props.isSignedIn && <li><Button color={Colors.SECONDARY} onClick={ () => this.setWeek(0) }>Current week</Button></li> }
				{ this.props.isSignedIn && <li><Button color={Colors.SECONDARY} onClick={ () => this.setWeek(1) }><i class="fa fa-chevron-right"></i></Button></li> }
				<li>
					<form onSubmit={ this.onSubmit.bind(this) }>
						<input type="text" name="timeZone" value={this.state.timeZone} onChange={ this.onTimeZoneChange.bind(this) } placeholder="Timezone" required />
					</form>
				</li>
			</ul>
		);
		
	}
	
}

const mapStateToProps = state => {
	
	return {
		timeZone: state.settings.timeZone,
		isSignedIn: state.user.isSignedIn,
		week: state.settings.week
	};

};

export default connect(mapStateToProps)(CalendarNav);