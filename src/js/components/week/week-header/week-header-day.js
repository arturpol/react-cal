import React from 'react';

import utils from '../../../helpers/utils.js';
import Event from '../event.js';

class WeekHeaderDay extends React.Component {
	
	constructor(props){
		
		super(props);
		this.state = { events: [], isToday: false };
		
	}
	
	static getDerivedStateFromProps(nextProps, prevState){
		
		let { events, day } = nextProps;
		
		if(events && day) {
		
			return { 
				...prevState, 
				events: WeekHeaderDay.getEvents(events, day.start),
				isToday: WeekHeaderDay.getIsToday(day.start)
			};
			
		}
		
		return null;
		
	}
	
	static getIsToday(start){
		
		let end = new Date(start.valueOf());
		end.setDate(end.getDate() + 1);
		let now = Date.now();
		
		return now >= start.valueOf() && now < end.valueOf();
		
	}
	
	static getEvents(events, start){
		
		let end = new Date(start.valueOf());
		end.setDate(end.getDate() + 1);
		
		return events.filter(e => {
			
			if(!('start' in e) || !e.start || 'dateTime' in e.start || !('date' in e.start)) return false;
			let eStart = utils.parseDate(e.start.date);
			if(eStart.valueOf() >= end.valueOf()) return false;
			if(!('end' in e) || (!('dateTime' in e.end) && !('date' in e.end))) return true;
			let eEnd = 'date' in e.end ? utils.parseDate(e.end.date) : new Date(e.end.dateTime);
			if(eEnd.valueOf() <= start.valueOf()) return false;
			return true;
			
		});
		
	}
	
	render(){
		
		let { day, date } = this.props.day;
		let cls = 'day cell auto' + (this.state.isToday ? ' today' : '');
		
		return (
			<div class={cls}>
				<h6>{ day }</h6>
				<h2>{ date }</h2>
				{ 
					this.state.events.length > 0 
						? 
					( <ul>{ this.state.events.map(e => <li key={e.id}><Event data={e} isDayEvent /></li>) }</ul> ) 
						: 
					null 
				}
			</div>
		);
		
	}
	
}

export default WeekHeaderDay;