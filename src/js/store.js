import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { router5Middleware, router5Reducer } from 'redux-router5';

import router from './router.js';
import reducer from './reducers';
import * as epics from './actions/epics.js';

let epicsArray = [];

for(let i in epics){
	
	if(epics.hasOwnProperty(i)) epicsArray.push(epics[i]);
	
}

const rootEpic = combineEpics(...epicsArray);
const middleware = applyMiddleware(router5Middleware(router), createEpicMiddleware(rootEpic), logger);
const store = createStore(reducer, middleware);

export default store;