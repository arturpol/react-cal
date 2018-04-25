import config from './config.js';

class Utilities{
	
	getWeek(date = new Date(), weekDelta = 0){
		
		let d = date ? new Date(date.valueOf()) : new Date();
		
		const monday = 1;
		let day = d.getDay();
		let delta = weekDelta * 7 + (day > 0 ? monday - day : -6);
		d.setDate(d.getDate() + delta);
		
		return d;
		
	}
	
	getGoogleApiClient(){

		return new Promise((resolve, reject) => {

			if(typeof gapi != 'object') reject('No Google API object');
			else gapi.load('client:auth2', () => resolve(gapi));

		}).then(function(){

			return gapi.client.init(config.googleApi).then(() => {

				return { auth: gapi.auth2.getAuthInstance(), client: gapi.client };

			});

		});

	}
	
	parseDate(date){
		
		try{
			
			var d = new Date(Date.parse(date));
			d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
			
		}catch(e){
			
			d = null;
			
		}
		
		return d;
		
	}
	
	weekToDate(week){
		
		let date = new Date(week.valueOf());
		date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
		return date.toJSON().split('T')[0];
		
	}
	
	getEvents(client, start, end, calendarIds, timeZone){

		let calendars = calendarIds.map(id => {

			return{ 
				id, 
				promise: client.calendar.events.list({ 
					calendarId: id,
					maxResults: config.events.limitPerCalendar,
					timeMax: end.toJSON(),
					timeMin: start.toJSON(),
					timeZone
				})
			};

		});
		
		return Promise.all(calendars.map( calendar => calendar.promise )).then((responses) => {

			var events = {};
			responses.forEach((response, index) => events[calendars[index].id] = response.result.items);
			return events;
			
		});

	}
	
}

const utils = new Utilities();

export default utils;