import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode } from '@dojo/widget-core/interfaces';
import { v, w } from '@dojo/widget-core/d';

export default class MyWidget extends WidgetBase<any> {
	render() {
		return v('div', [ this.properties.label, ...this.children ]);
	}
}
