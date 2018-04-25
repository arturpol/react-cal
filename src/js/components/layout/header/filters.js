import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setSelectCalendars } from '../../../actions/actions.js';

class Filters extends React.Component {
	
	onChange(calendar){
		
		let selected = [].concat(this.props.selectedCalendars);
		let index = selected.indexOf(calendar);
		if(index >= 0) selected.splice(index, 1);
		else selected.push(calendar);
		
		this.props.setSelectCalendars(selected);
		
	}
	
	getStyle(color){
		
		return { color };
		
	}
	
	render(){
		
		if(!this.props.calendars || this.props.calendars.length <= 0) return null;
		
		return (
			<aside class="filters">
				<div class="grid-x align-justify grid-padding-x">
					<div class="cell shrink">
						<ul class="inline">
							{ 
								this.props.calendars.map(i => (
									<li key={i.id} style={ this.getStyle(i.backgroundColor) }>
										<input type="checkbox" id={i.id} name={i.id} checked={ this.props.selectedCalendars.indexOf(i.id) >= 0 } onChange={ (e) => this.onChange(i.id) } /> 
										<label for={i.id}>{i.summary}</label>
									</li>
								)) 
							}
						</ul>
					</div>
				</div>
			</aside>
		);
		
	}
	
};

const mapStateToProps = state => {
	
	return {
		calendars: state.user.calendars,
		selectedCalendars: state.settings.selectedCalendars
	};

};

const mapDispatchToProps = dispatch => {
	
	return bindActionCreators({
		setSelectCalendars
	}, dispatch);
	
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);