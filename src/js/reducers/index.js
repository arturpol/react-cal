import { combineReducers } from 'redux';
import { router5Reducer } from 'redux-router5';

import user from './userReducer';
import settings from './settingsReducer';

export default combineReducers({
	router: router5Reducer,
	user,
	settings
});