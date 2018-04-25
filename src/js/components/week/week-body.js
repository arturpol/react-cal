import React from 'react';

import WeekBodyDay from './week-body/week-body-day.js';
import config from '../../helpers/config.js';

class WeekBody extends React.Component {
	
	constructor(props){
		
		super(props);
		this.state = { hours: WeekBody.getHours() };
		
	}
	
	static getHours(){
		
		let start = config.day.hourStart;
		let end = config.day.hourEnd;
		
		if(end < 12) end += 24;
		
		let hours = [];
		let total = end - start;
		
		for(let i = start ; i <= end ; i++){
			
			let j = i % 24;
			let top = 'calc(' + (((i - start) / total) * 100) + '% - 0.35rem)';
			
			hours.push({
				content: (j < 10 ? '0' : '') + j + ':00',
				hour: j,
				style: { top: top }
			});
						 
		}
					 
		return hours;
		
	}
	
	render(){
		
		return (
			<div class="week-body cell auto">
				<div class="grid-x">
					<div class="hours cell auto">
						<ul>
							{ this.state.hours.map( h => (<li key={h.hour} style={h.style}>{ h.content }</li>) ) }
						</ul>
					</div>
					{ this.props.days.map(d => <WeekBodyDay key={d.date} day={d} events={this.props.events} hours={this.state.hours} />) }
				</div>
			</div>
		);
		
	}
	
}

export default WeekBody;