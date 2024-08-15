import { UmbPickerModalContext } from '@umbraco-cms/backoffice/picker-modal';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';

export class UmbTreeItemPickerModalContext extends UmbPickerModalContext {
	constructor(host: UmbControllerHost) {
		super(host);
	}
}

export { UmbTreeItemPickerModalContext as api };
