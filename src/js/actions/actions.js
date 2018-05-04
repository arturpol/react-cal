import config from '../helpers/config.js';

export const INITIALIZE = 'INITIALIZE';
export const SET_GOOGLE_API_CLIENT = 'SET_GOOGLE_API_CLIENT';
export const SET_IS_SIGNED_IN = 'SET_IS_SIGNED_IN';
export const SET_DEFAULTS = 'SET_DEFAULTS';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_IN = 'SIGN_IN';
export const TRANSITION_SUCCESS = 'TRANSITION_SUCCESS';
export const SET_WEEK = 'SET_WEEK';
export const UPDATE_WEEK = 'UPDATE_WEEK';
export const SET_TIME_ZONE = 'SET_TIME_ZONE';
export const GET_EVENTS = 'GET_EVENTS';
export const SET_EVENTS = 'SET_EVENTS';
export const GET_CALENDARS = 'GET_CALENDARS';
export const SET_CALENDARS = 'SET_CALENDARS';
export const SET_SELECTED_CALENDARS = 'SET_SELECTED_CALENDARS';

export const setDefaults = () => {
	
	let timeZone = localStorage.getItem(config.timeZone.key);
	
	if(!timeZone) timeZone = config.timeZone.def;
	
	let settings = {
		timeZone
	};
	
	return {
		type: SET_DEFAULTS,
		payload: settings
	};
	
};

export const setGoogleApiClient = (client) => {
	
	return {
		type: SET_GOOGLE_API_CLIENT,
		payload: client
	};
	
};

export const setIsSignedIn = (isSignedIn) => {
	
	return {
		type: SET_IS_SIGNED_IN,
		payload: isSignedIn
	};
	
};

export const getEvents = () => {
	
	return {
		type: GET_EVENTS
	};
	
};

export const setEvents = (events) => {
	
	return {
		type: SET_EVENTS,
		payload: events
	};
	
};

export const getCalendars = () => {
	
	return {
		type: GET_CALENDARS
	};
	
};

export const setCalendars = (calendars) => {
	
	return {
		type: SET_CALENDARS,
		payload: calendars
	};
	
};

export const initialize = () => {
	
	return {
		type: INITIALIZE
	};
	
};

export const signOut = () => {
	
	return {
		type: SIGN_OUT
	};
	
};

export const signIn = () => {
	
	return {
		type: SIGN_IN	
	};
	
};

export const setWeek = (week) => {

	return {
		type: SET_WEEK,
		payload: week
	};
	
};

export const updateWeek = () => {

	return {
		type: UPDATE_WEEK
	};
	
};

export const setTimeZone = (timeZone) => {
	
	localStorage.setItem(config.timeZone.key, timeZone);
	
	return {
		type: SET_TIME_ZONE,
		payload: timeZone
	};
	
};

export const setSelectCalendars = (selected) => {
	
	return {
		type: SET_SELECTED_CALENDARS,
		payload: selected
	};
	
};
