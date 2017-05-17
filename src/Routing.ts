import Map from '@dojo/shim/Map';
import { beforeRender, WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { BaseInjector } from '@dojo/widget-core/Injector';
import { Router } from '@dojo/routing/Router';
import { Route } from '@dojo/routing/Route';
import { v, w } from '@dojo/widget-core/d';

/**
 * Config for registering routes
 */
export interface RouteConfig {
	path: string;
	children: RouteConfig[];
}

/**
 * Register the route config with a router
 */
export function registerRoutes(routes: any[], router: Router<any>, parentRoute?: Route<any, any>, depth = -1) {
	depth++;
	routes.forEach((routeDef) => {
		const route = new Route({
			path: routeDef.path,
			exec(request) {
				router.emit<any>({ type: 'route', depth, path: routeDef.path, chunk: routeDef.path, request });
			}
		});
		if (parentRoute !== undefined) {
			parentRoute.append(route);
		}
		else {
			router.append(route);
		}
		if (routeDef.children) {
			registerRoutes(routeDef.children, router, route, depth);
		}
	});
}

/**
 * Context for a router
 */
interface RouterContext {
	router: Router<any>;
	matchedRoutes: Map<any, any>;
	started: boolean;
	routeParams: Map<any, any>;
	depth: number;
}

/**
 * Create a router context from the router instance
 */
export function createRouterContext(router: Router<any>) {
	const context: RouterContext = {
		router,
		matchedRoutes: new Map(),
		started: false,
		routeParams: new Map(),
		depth: 0
	};

	router.on('navstart', (event: any) => {
		context.started = true;
		context.matchedRoutes = new Map();
		context.routeParams = new Map();
		context.depth = 0;
	});

	router.on('route', (event: any) => {
		const routes = context.matchedRoutes.get(event.depth);
		if (routes === undefined) {
			context.matchedRoutes.set(event.depth, [ event.path ]);
		}
		else {
			routes.push(event.path);
			context.matchedRoutes.set(event.depth, routes);
		}

		context.routeParams.set(event.path, {
			params: event.request.params,
			depth: event.depth
		});
	});
	return context;
}

/**
 * No opertation render for when routes don't match
 */
function noopRender(): DNode {
	return null;
}

export interface RoutingProperties extends WidgetProperties {
	route: string;
	onExit?: Function;
	onEnter?: Function;
}

export class Routing extends WidgetBase<RoutingProperties> {

	protected render() {
		const renderFunc = this.children.length > 1 ? () => v('div', this.children) : () => this.children[0];

		return w<RouterInjector>('router', {
			bind: this,
			render: renderFunc,
			getProperties: (inject: any, properties: any): any => {
				return { route: this.properties.route, onExit: this.properties.onExit, onEnter: this.properties.onEnter };
			},
			properties: {},
			children: []
		});
	}
}

/**
 * Router Injector class
 */
export class RouterInjector extends BaseInjector<RouterContext> {

	/**
	 * This would just be `context` if it was exposed.
	 */
	private _routerContext: RouterContext;

	/**
	 * saved render function
	 */
	private _routeRenderFunc: (() => DNode) | undefined;

	/**
	 * if the route is visible
	 */
	private _isVisible: boolean;

	private _route: string;

	private _onExit: Function;

	/**
	 * Create the injector
	 */
	constructor(context: RouterContext) {
		super(context);
		this._routerContext = context;
		context.router.on('navstart', (event: any) => {
			this._routeRenderFunc = undefined;
			this.invalidate();
		});
		this.own({
			destroy: () => {
				this._onExit && this._onExit(this._route);
			}
		});
	}

	/**
	 * Check the route
	 */
	@beforeRender()
	protected checkRoute(renderFunc: () => DNode, properties: any, children: any) {
		const { properties: { getProperties = () => {} }, _routeRenderFunc, _routerContext: { started, depth, matchedRoutes, routeParams } } = this;

		if (_routeRenderFunc === undefined) {
			this._routeRenderFunc = noopRender;
			if (started) {

				const { route, onEnter, onExit } = getProperties(this.toInject(), this.properties.properties);
				this._route = route;
				this._onExit = onExit;
				const routes = matchedRoutes.get(depth);
				if (routes) {
					const matched = routes[0] === route;

					if (matched) {
						const routeDetails = routeParams.get(route);

						if (!this._isVisible) {
							this._isVisible = true;
							onEnter && onEnter(route, routeDetails.params);
						}
						this._routerContext.depth = routeDetails.depth + 1;
						routes.unshift();
						this._routeRenderFunc = renderFunc;
					}
					else if (this._isVisible) {
						onExit && onExit(route);
						this._isVisible = false;
					}
				}
				else if (this._isVisible) {
					onExit && onExit(route);
					this._isVisible = false;
				}
			}
		}
		return this._routeRenderFunc;
	}
}
