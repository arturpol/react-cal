import createRouter from 'router5';
import loggerPlugin from 'router5/plugins/logger';
import browserPlugin from 'router5/plugins/browser';
import config from './helpers/config.js';

function setupRouter(useListenersPlugin = false){
	
    const router = createRouter(config.routes, {
        defaultRoute: config.defaultRoute
    })
    .usePlugin(loggerPlugin)
	.usePlugin(
		browserPlugin({
			useHash: true
		})
	);

    return router
	
}

const router = setupRouter();

export default router;