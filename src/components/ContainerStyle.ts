import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode } from '@dojo/widget-core/interfaces';
import { v, w } from '@dojo/widget-core/d';
import { Container } from '@dojo/widget-core/mixins/Container';

import { Routing } from './../Routing';
import MyWidget from './MyWidget';
import { onEnter, onExit } from './../main';

const ARoute = Container(MyWidget, 'router-second', {
	getProperties() {
		return {
			route: 'a',
			onEnter,
			onExit
		};
	}
});

const BRoute = Container(MyWidget, 'router-second', {
	getProperties() {
		return {
			route: 'b',
			onEnter,
			onExit
		};
	}
});

const CRoute = Container(MyWidget, 'router-second', {
	getProperties() {
		return {
			route: 'c',
			onEnter,
			onExit
		};
	}
});

const DRoute = Container(MyWidget, 'router-second', {
	getProperties() {
		return {
			route: 'd',
			onEnter,
			onExit
		};
	}
});

const ERoute = Container(MyWidget, 'router-second', {
	getProperties() {
		return {
			route: 'e/{param}',
			onEnter,
			onExit
		};
	}
});

const FRoute = Container(MyWidget, 'router-second', {
	getProperties() {
		return {
			route: 'f',
			onEnter,
			onExit
		};
	}
});

export default class ContainerStyle extends WidgetBase {

	protected render(): DNode {
		return v('div', [
			v('h1', [ 'Container Style' ]),
			w(ARoute, { key: 'a', label: 'a' }, [

				w(BRoute, { key: 'a/b', label: 'a/b' }, [
					w(CRoute, { key: 'a/b/c', label: 'a/b/c' }, [
						w(ERoute, { label: 'a/b/c/e' }, [
							w(FRoute, { label: 'a/b/c/e/f' })
						])
					])
				]),
				w(DRoute, { key: 'a/d', label: 'a/d' }, [])
			])
		]);
	}
}
