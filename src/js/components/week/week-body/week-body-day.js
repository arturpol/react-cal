import React from 'react';

import utils from '../../../helpers/utils.js';
import Event from '../event.js';

class WeekBodyDay extends React.Component {
	
	constructor(props){
		
		super(props);
		this.state = { events: [], hours: [] };
		
	}
	
	static getDerivedStateFromProps(nextProps, prevState){
		
		let { events, day, hours } = nextProps;
		
		if(events && day && hours) {
			
			return { 
				...prevState, 
				events: WeekBodyDay.getEvents(events, day.start, hours),
				hours: WeekBodyDay.getHours(hours)
			};
			
		}
		
		return null;
		
	}
	
	static getHours(hours){
		
		let h = [].concat(hours);
		if(h.length <= 2) return h;
		h.splice(0, 1);
		return h;
		
	}
	
	static getEvents(events, start, hours){
		
		let realStart = new Date(start.valueOf());
		let startHour = hours.length > 0 ? hours[0].hour : 8;
		let endHour = hours.length > 0 ? hours[hours.length - 1].hour : 24;
		realStart.setHours(realStart.getHours() + startHour);
		let realEnd = new Date(realStart.valueOf());
		let duration = endHour + (endHour < 12 ? 24 : 0) - startHour;
		realEnd.setHours(realEnd.getHours() + duration);
		
		return events.filter(e => {
			
			if(!('start' in e) || !e.start || !('dateTime' in e.start)) return false;
			let eStart = new Date(e.start.dateTime);
			if(eStart.valueOf() >= realEnd.valueOf()) return false;
			if(!('end' in e) || !('dateTime' in e.end)) return false;
			let eEnd = new Date(e.end.dateTime);
			if(eEnd.valueOf() <= realStart.valueOf()) return false;
			
			return true;
			
		}).map(e => {
			
			let eStart = new Date(e.start.dateTime);
			let eEnd = new Date(e.end.dateTime);
			let eDuration = (eEnd.valueOf() - eStart.valueOf()) / 3600000;
			let height = (eDuration / duration) * 100;
			let top = ((eStart.valueOf() - realStart.valueOf()) / (realEnd.valueOf() - realStart.valueOf())) * 100;
			
			if(height > 100) height = 100;
			else if(height <= 0) height = 2;
			
			if(top < 0) top = 0;
			if(top + height > 100) height = 100 - top;
			
			height += '%';
			top += '%';
			
			return { ...e, style: { height, top } };
			
		});
		
	}
	
	render(){
		
		return (
			<div class="day cell auto">
				<div class="grid-y">
					{ this.state.hours.map( h => (<div key={h.hour} class="hour cell auto">&nbsp;</div>) )}
				</div>
				{ 
					this.state.events.length > 0 
						? 
					( <ul>{ this.state.events.map(e => <li key={e.id} style={e.style}><Event data={e} /></li>) }</ul> ) 
						: 
					null 
				}
			</div>
		);
		
	}
	
}

export default WeekBodyDay;