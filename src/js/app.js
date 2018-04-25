import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';
import 'rxjs';

import store from './store.js';
import Layout from './components/layout.js';
import config from './helpers/config.js';
import router from './router.js';

const root = document.getElementById('app');

const app = (
	<Provider store={store}>
		<RouterProvider router={router}>
			<Layout title={config.title} />
		</RouterProvider>
	</Provider>
);

router.start((error, state) => {
	ReactDOM.render(app, root);
});