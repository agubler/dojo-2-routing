import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode } from '@dojo/widget-core/interfaces';
import { v, w } from '@dojo/widget-core/d';

import { Routing } from './../Routing';
import MyWidget from './MyWidget';
import { onEnter, onExit } from './../main';

export default class ComponentStyle extends WidgetBase {

	protected render(): DNode {
		return v('div', [
			v('h1', [ 'Component Style' ]),
			w(Routing, { route: 'a', onEnter, onExit }, [
				w(MyWidget, { label: 'a' }),
				w(Routing, { key: 'b', route: 'b', onEnter, onExit  }, [
					w(MyWidget, { label: 'a/b' }),
					w(Routing, { route: 'c', onEnter, onExit  }, [
						w(MyWidget, { label: 'a/b/c' }),
						w(Routing, { route: 'e/{param}', onEnter, onExit  }, [
							w(MyWidget, { label: 'a/b/c/e' }),
							w(Routing, { route: 'f', onEnter, onExit  }, [
								w(MyWidget, { label: 'a/b/c/e/f' })
							])
						])
					])
				]),
				w(Routing, { key: 'd', route: 'd', onEnter, onExit  }, [
					w(MyWidget, { label: 'a/d' })
				])
			])
		]);
	}
}
