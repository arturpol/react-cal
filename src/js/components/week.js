import React from 'react';
import { connect } from 'react-redux';

import WeekHeader from './week/week-header.js';
import WeekBody from './week/week-body.js';

class Week extends React.Component {
	
	constructor(props){
		
		super(props);
		this.state = { days: [] };
		
	}
	
	static getDerivedStateFromProps(nextProps, prevState){
		
		let { week, calendars, events, selectedCalendars } = nextProps;
		
		if(!week && !calendars && !events && !selectedCalendars) return null;
		
		let state = { ...prevState };
		
		if(week) state.days = Week.getDays(week);
		if(events && calendars && selectedCalendars) state.events = Week.getEvents(calendars, events, selectedCalendars);
		
		return state;
		
	}
	
	static getEvents(calendars, events, selectedCalendars){
		
		let result = [];
		
		for(let id in events){
			
			if(selectedCalendars.indexOf(id) < 0) continue;
			
			let list = events[id];
			let calendar = calendars.find(i => i.id == id);
			let { backgroundColor, foregroundColor } = calendar;
			
			list.forEach(i => result.push({ ...i, backgroundColor, foregroundColor }));
			
		}
		
		return result;
		
	}
	
	static getDays(start){
		
		let date = new Date(start.valueOf());
		let days = [];
		
		for(let i = 0 ; i < 7 ; i++){
			
			let parts = date.toDateString().split(' ');
			
			days.push({
				start: new Date(date.valueOf()),
				day: parts[0],
				date: parts[2]
			});
			
			date.setDate(date.getDate() + 1);
			
		}
		
		return days;
		
	}
	
	render(){
		
		return (
			<div class="week cell auto">
				<div class="grid-y">
					<WeekHeader { ...this.state } />
					<WeekBody { ...this.state } />
				</div>
			</div>
		);
		
	}
	
}

const mapStateToProps = state => {

	return {
		week: state.settings.week,
		calendars: state.user.calendars,
		events: state.user.events,
		selectedCalendars: state.settings.selectedCalendars
	};

};

export default connect(mapStateToProps)(Week);