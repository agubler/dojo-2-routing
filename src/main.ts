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

export function onExit(route: string) {
	console.log('exiting route', route);
}

export function onEnter(route: string, params: any) {
	console.log('entering route', route, 'params', params);
}

const root = document.querySelector('my-app') || undefined;

const Projector = ProjectorMixin(App);
const projector = new Projector();

projector.append(root);
router.start();
