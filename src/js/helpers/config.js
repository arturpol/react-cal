const config = {
	
	title: 'Calendar',
	
	googleApi: {
		apiKey: 'AIzaSyCLQI72CSPGZyovypPmXkHDjUj0ZZbz8yM',
		discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
		clientId: '915514073627-nrb4l5nqh6t288gc2kiniuj6973ebgvr.apps.googleusercontent.com',
		scope: 'profile https://www.googleapis.com/auth/calendar'
	},
	
	timeZone: {
		def: 'Europe/Warsaw',
		key: 'SETTINGS_TIMEZONE'
	},
	
	day: {
		hourStart: 8,
		hourEnd: 1
	},
	
	events: {
		limitPerCalendar: 1000
	},
	
	routes: [
		{ name: 'week', path: '/week' },
		{ name: 'week.selected', path: '/:week' },
		{ name: 'login', path: '/login' }
	],
	defaultRoute: 'login'
	
};

export default config;