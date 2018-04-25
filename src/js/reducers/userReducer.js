
import { SET_GOOGLE_API_CLIENT, SET_IS_SIGNED_IN, SET_CALENDARS, SET_EVENTS } from '../actions/actions.js';

const defaultState = {
	
	google: null,
	isSignedIn: false,
	calendars: null,
	events: null
	
};

function reduceEvents(calendars){
	
	for(let i in calendars){
		
		let events = calendars[i];
		
		calendars[i] = events.map(j => {
			
			let { id, creator, description, end, location, start, summary } = j;
			
			return {
				id,
				creator: { self: creator.self, displayName: creator.displayName },
				description,
				end,
				location,
				start,
				summary
			};
			
		});
		
	}
	
	return calendars;
	
};

function reduceCalendar(calendar){
	
	let { 
		backgroundColor,
		foregroundColor,
		id,
		selected,
		summary,
		timeZone,
		summaryOverride
	} = calendar;
	
	if(summaryOverride) summary = summaryOverride;
	
	return { backgroundColor, foregroundColor, id, selected, summary, timeZone };
	
}

function reducer(state = defaultState, action){
	
	switch(action.type){
		
		case SET_GOOGLE_API_CLIENT:
			return { ...state, google: action.payload };
		
		case SET_IS_SIGNED_IN:
			return { ...state, isSignedIn: action.payload, calendars: null, events: null };
		
		case SET_CALENDARS:
			return { ...state, calendars: action.payload.map(reduceCalendar) };
		
		case SET_EVENTS:
			return { ...state, events: reduceEvents(action.payload) };
			
		default:
			return state;
	}

}

export default reducer;