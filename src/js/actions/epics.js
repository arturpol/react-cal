import { Observable } from 'rxjs';
import { actions as routerActions } from 'redux-router5';

import utils from '../helpers/utils.js';
import * as actions from './actions.js';

export const initEpic = (action$, store) => {
	
	return action$
		.ofType(actions.INITIALIZE)
		.mergeMap(() => {

			return Observable.from(utils.getGoogleApiClient())
				.map(actions.setGoogleApiClient);
		
		});
	
};

export const defaultsEpic = (action$, store) => {
	
	return action$
		.ofType(actions.INITIALIZE)
		.map(actions.setDefaults);

};

export const authEpic = (action$, store) => {
	
	return action$.ofType(actions.SET_GOOGLE_API_CLIENT)
		.mergeMap((action) => {
		
			let auth = action.payload.auth;
			
			return Observable.from(new Promise((resolve) => {
				auth.isSignedIn.listen(resolve);
			})).startWith(auth.isSignedIn.get()).map(actions.setIsSignedIn);

		});
	
};

export const isSignedInEpic = (action$, store) => {
	
	return action$.ofType(actions.SET_IS_SIGNED_IN).map((action) => {
		
		return routerActions.navigateTo(action.payload ? 'week' : 'login');
		
	});
	
};

export const signOutEpic = (action$, store) => {
	
	return action$
		.ofType(actions.SIGN_OUT)
		.mergeMap(() => {
			
			let state = store.getState();
			
			return Observable.from(state.user.google.auth.signOut())
				.map(() => actions.setIsSignedIn(false));
		
		});
	
};

export const signInEpic = (action$, store) => {
	
	return action$
		.ofType(actions.SIGN_IN)
		.mergeMap(() => {
			
			let state = store.getState();
			
			return Observable.from(state.user.google.auth.signIn())
				.map(() => actions.setIsSignedIn(true));
		
		});
	
};

export const signedOutRoutingEpic = (action$, store) => {
	
	return action$
		.filter(action => action.type.endsWith(actions.TRANSITION_SUCCESS) && !store.getState().user.isSignedIn && action.payload.route.name != 'login')
		.mapTo(routerActions.navigateTo('login'));
	
};

export const signedInRoutingEpic = (action$, store) => {
	
	return action$
		.filter(action => action.type.endsWith(actions.TRANSITION_SUCCESS) && store.getState().user.isSignedIn && action.payload.route.name == 'login')
		.mapTo(routerActions.navigateTo('week'));
	
};

export const weekRoutingEpic = (action$, store) => {
	
	return action$
		.filter(action => action.type.endsWith(actions.TRANSITION_SUCCESS) && action.payload.route.name == 'week')
		.map(() => {
			
			let date = utils.weekToDate(utils.getWeek());
			return routerActions.navigateTo('week.selected', { week: date });
		
		});
	
};

export const weekSelectedRoutingEpic = (action$, store) => {
	
	return action$
		.filter(action => action.type.endsWith(actions.TRANSITION_SUCCESS) && action.payload.route.name == 'week.selected')
		.map((action) => {
			
			let selected = utils.parseDate(action.payload.route.params.week);
			let week = utils.getWeek(selected);
			let date = utils.weekToDate(week);
			
			if(action.payload.route.params.week != date){
				
				return routerActions.navigateTo('week.selected', { week: date });
				
			}else{
				
				return actions.setWeek(week);
				
			}
		
		});
	
};

export const weekSetEpic = (action$, store) => {
	
	return action$
		.ofType(actions.SET_WEEK)
		.map(actions.updateWeek);
	
};

export const timeZoneSetEpic = (action$, store) => {
	
	return action$
		.ofType(actions.SET_TIME_ZONE)
		.map(actions.updateWeek);
	
};

export const updateWeekEpic = (action$, store) => {
	
	return action$
		.ofType(actions.UPDATE_WEEK)
		.mergeMap(() => {
			
			let state = store.getState();
			let _actions = [ actions.getEvents() ];
			if(!state.user.calendars) _actions.unshift(actions.getCalendars());
			return Observable.from(_actions);
		
		});
	
};

export const getCalendarsEpic = (action$, store) => {
	
	let clientAction = action$.ofType(actions.SET_GOOGLE_API_CLIENT);
	
	return action$.ofType(actions.GET_CALENDARS)
		.combineLatest(clientAction, (a, b) => {
			
			return Observable
				.from(b.payload.client.calendar.calendarList.list())
				.map(response => response.result.items);
		
		})
		.mergeAll()
		.map(actions.setCalendars);
	
};

export const getEventsEpic = (action$, store) => {

	let clientAction = action$.ofType(actions.SET_GOOGLE_API_CLIENT);
	let calendarAction = action$.ofType(actions.SET_CALENDARS);
	
	return action$.ofType(actions.GET_EVENTS)
		.combineLatest(clientAction, calendarAction, (a, b, c) => {
		
			let state = store.getState();
			let start = state.settings.week;
			let end = utils.getWeek(start, 1);
			let calendarIds = c.payload.map(calendar => calendar.id);
			let client = b.payload.client;
			let { timeZone } = state.settings;
			
			return Observable
				.from(utils.getEvents(client, start, end, calendarIds, timeZone));
		
		})
		.mergeAll()
		.map(actions.setEvents);
	
};