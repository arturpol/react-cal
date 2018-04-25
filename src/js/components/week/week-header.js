import React from 'react';
import { connect } from 'react-redux';

import WeekHeaderDay from './week-header/week-header-day.js';

class WeekHeader extends React.Component {
	
	constructor(props){
		
		super(props);
		this.state = { header: '' };
		
	}
	
	static getDerivedStateFromProps(nextProps, prevState){
		
		let start = nextProps.week;
		let text =  start ? WeekHeader.getHeader(start) : null;
		
		return { ...prevState, header: text };
		
	}
	
	static getHeader(start){
		
		let end = new Date(start.valueOf());
		end.setDate(end.getDate() + 6);
		let startParts = start.toDateString().split(' ');
		let endParts = end.toDateString().split(' ');
		let startMonth = startParts[1];
		let endMonth = endParts[1];
		let startYear = startParts[3];
		let endYear = endParts[3];
		let text = '';
		
		if(startYear == endYear){
			
			text = startMonth == endMonth ? `${startMonth} ${startYear}` : `${startMonth}/${endMonth} ${startYear}`;
				
		}else{
			
			text = `${startMonth} ${startYear} / ${endMonth} ${endYear}`;
			
		}
		
		return text;
		
	}
	
	render(){
		
		return (
			<div class="week-header cell shrink">
				<div class="grid-x grid-padding-x">
					<div class="hours cell auto">
						<h4>{this.state.header}</h4>
					</div>
					{ this.props.days.map(d => <WeekHeaderDay key={d.date} day={d} events={this.props.events} />) }
				</div>
			</div>
		);
		
	}
	
}


const mapStateToProps = state => {
	
	return {
		week: state.settings.week
	};

};

export default connect(mapStateToProps)(WeekHeader);