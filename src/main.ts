import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import App from './App';
import Router from '@dojo/routing/Router';
import HashHistory from '@dojo/routing/history/HashHistory';
import { Injector } from '@dojo/widget-core/Injector';
import { registry } from '@dojo/widget-core/d';

import { createRouterContext, RouterInjector, registerRoutes } from './Routing';

const router = new Router({ history: new HashHistory() });
registry.define('router', Injector(RouterInjector, createRouterContext(router)));
registry.define('router-second', Injector(RouterInjector, createRouterContext(router)));

const routes = [
	{
		path: 'a',
		children: [
			{
				path: 'b',
				children: [
					{
						path: 'c',
						children: [
							{
								path: 'e/{param}',
								children: [
									{
										path: 'f'
									}
								]
							}
						]
					}
				]
			},
			{
				path: 'd'
			}
		]
	}
];

registerRoutes(routes, router);

const enterAction: string[] = [];
const exitAction: string[] = [];

export function onExit(route: string) {
	let entry: string = route;

	if (exitAction.length === 10) {
		exitAction.shift();
		exitAction.push(entry);
	}
	else {
		exitAction.push(entry);
	}

	projector.setProperties({
		enterAction: [ ...enterAction ],
		exitAction: [ ...exitAction ]
	});
}

export function onEnter(route: string, params: any) {
	let entry: string = route;
	if (Object.keys(params).length > 0) {
		entry = `${route} with params ${JSON.stringify(params)}`;
	}

	if (enterAction.length === 10) {
		enterAction.shift();
		enterAction.push(entry);
	}
	else {
		enterAction.push(entry);
	}

	projector.setProperties({
		enterAction: [ ...enterAction ],
		exitAction: [ ...exitAction ]
	});
}

const root = document.querySelector('my-app') || undefined;

const Projector = ProjectorMixin(App);
const projector = new Projector();
projector.setProperties({
	enterAction: [ ...enterAction ],
	exitAction: [ ...exitAction ]
});

projector.append(root);
router.start();
