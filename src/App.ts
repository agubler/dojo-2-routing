import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode } from '@dojo/widget-core/interfaces';
import { v, w } from '@dojo/widget-core/d';

import ComponentStyle from './components/ComponentStyle';
import ContainerSyle from './components/ContainerStyle';

export default class App extends WidgetBase {

	protected render(): DNode {
		return v('div', [
			v('div', [
				v('a', { styles: { 'margin-right': '20px' }, href: '#a' }, [ 'a' ]),
				v('a', { styles: { 'margin-right': '20px' }, href: '#a/b' }, [ 'a/b' ]),
				v('a', { styles: { 'margin-right': '20px' }, href: '#a/b/c' }, [ 'a/b/c' ]),
				v('a', { styles: { 'margin-right': '20px' }, href: '#a/b/c/e/12345' }, [ 'a/b/c/e' ]),
				v('a', { styles: { 'margin-right': '20px' }, href: '#a/b/c/e/12345/f' }, [ 'a/b/c/e/f' ]),
				v('a', { styles: { 'margin-right': '20px' }, href: '#a/d' }, [ 'a/d' ]),
				v('a', { styles: { 'margin-right': '20px' }, href: '#other' }, [ 'other' ])
			]),
			w(ComponentStyle, {}),
			w(ContainerSyle, {})
		]);
	}
}
