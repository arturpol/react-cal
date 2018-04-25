import { SET_DEFAULTS, SET_IS_SIGNED_IN, SET_WEEK, SET_TIME_ZONE, SET_CALENDARS, SET_SELECTED_CALENDARS } from '../actions/actions.js';
import config from '../helpers/config.js';

const defaultState = {
	timeZone: config.timeZone.def,
	selectedCalendars: [],
	week: null
};

function reduceSelectedCalendar(selected, calendars){
	
	let result = selected.filter(id => calendars.find(i => i.id === id));
	
	calendars.forEach(item => {
		
		if(item.selected && result.indexOf(item.id) < 0) result.push(item.id);
		
	});
	
	return result;
	
}

function settings(state = defaultState, action){
	
	switch(action.type){
		
		case SET_DEFAULTS:
			return { ...state, ...action.payload };
		
		case SET_IS_SIGNED_IN:
			return { ...state, selectedCalendars: [] };
		
		case SET_WEEK:
			return { ...state, week: action.payload };
		
		case SET_TIME_ZONE:
			return { ...state, timeZone: action.payload };
		
		case SET_CALENDARS:
			return { ...state, selectedCalendars: reduceSelectedCalendar(state.selectedCalendars, action.payload) };
		
		case SET_SELECTED_CALENDARS:
			return { ...state, selectedCalendars: [].concat(action.payload) }
			
		default:
			return state;
			
	}
	
}

export default settings;