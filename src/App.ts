import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode } from '@dojo/widget-core/interfaces';
import { v, w } from '@dojo/widget-core/d';

import ComponentStyle from './components/ComponentStyle';
import ContainerSyle from './components/ContainerStyle';

export default class App extends WidgetBase<any> {

	protected render(): DNode {
		return v('div', [
			v('div', [
				v('a', { styles: { 'margin-right': '20px' }, href: '#a' }, [ 'a' ]),
				v('a', { styles: { 'margin-right': '20px' }, href: '#a/b' }, [ 'a/b' ]),
				v('a', { styles: { 'margin-right': '20px' }, href: '#a/b/c' }, [ 'a/b/c' ]),
				v('a', { styles: { 'margin-right': '20px' }, href: '#a/b/c/e/12345' }, [ 'a/b/c/e/12345' ]),
				v('a', { styles: { 'margin-right': '20px' }, href: '#a/b/c/e/12345/f' }, [ 'a/b/c/e/12345/f' ]),
				v('a', { styles: { 'margin-right': '20px' }, href: '#a/b/c/e/234' }, [ 'a/b/c/e/234' ]),
				v('a', { styles: { 'margin-right': '20px' }, href: '#a/b/c/e/234/f' }, [ 'a/b/c/e/234/f' ]),
				v('a', { styles: { 'margin-right': '20px' }, href: '#a/d' }, [ 'a/d' ]),
				v('a', { styles: { 'margin-right': '20px' }, href: '#other' }, [ 'other' ])
			]),
			v('div', { styles: { display: 'flex' } }, [
				v('div', { styles: { flex: '1' } }, [
					w(ComponentStyle, {})
					/*w(ContainerSyle, {})*/
				]),
				v('div', { styles: { flex: '1' } }, [
					v('h3', { styles: { margin: '20px' } }, [
						'Enter Action'
					]),
					v('ol', { styles: { margin: '20px' } }, this.properties.enterAction.map((action: string) => {
						return v('li', [ action ]);
					})),
					v('h3', { styles: { margin: '20px' } }, [
						'Exit Action'
					]),
					v('ol', { styles: { margin: '20px' } }, this.properties.exitAction.map((action: string) => {
						return v('li', [ action ]);
					}))
				])
			])
		]);
	}
}
