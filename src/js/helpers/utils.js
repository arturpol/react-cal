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
					timeZone,
					showDeleted: false,
					singleEvents: true
				})
			};

		});
		
		return Promise.all(calendars.map( calendar => calendar.promise )).then((responses) => {
			
			return Promise.all(responses.map((response, index) => {
				
				let items = response.result.items;
				let calendarId = calendars[index].id;
				let regular = [],
					recurring = [];
				
				items.forEach(item => {
					
					if(item.status == 'cancelled') return;
					if(Array.isArray(item.recurrence)) recurring.push(item);
					regular.push(item);
					
				});

				return Promise.all(recurring.map(item => {

					let timeMin = start.toJSON();

					if(item.end) timeMin = item.end.dateTime ? item.end.dateTime : this.parseDate(item.end.date);
					else timeMin = item.start.dateTime ? item.start.dateTime : this.parseDate(item.start.date);

					return client.calendar.events.instances({
						calendarId,
						eventId: item.id,
						maxResults: config.events.limitPerCalendar,
						timeMax: end.toJSON(),
						timeMin,
						timeZone,
						showDeleted: false
					});

				})).then((itemResponses) => {
					
					itemResponses.forEach((itemResponse, index) => {
						
						let confirmed = itemResponse.result.items.filter(i => i.status != 'cancelled');
						regular = regular.concat(confirmed);
						
					});
					
					return regular;
					
				});
				
			})).then(results => {
				
				var events = {};
				results.forEach((result, index) => events[calendars[index].id] = result);
				return events;
				
			});
			
			
		});

	}
	
}

const utils = new Utilities();

export default utils;