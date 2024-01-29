import { UmbDocumentPublicAccessRepository } from './repository/public-access.repository.js';
import { UMB_PUBLIC_ACCESS_MODAL } from './modal/public-access-modal.token.js';
import { UmbEntityActionBase } from '@umbraco-cms/backoffice/entity-action';
import type { UmbControllerHostElement } from '@umbraco-cms/backoffice/controller-api';
import { UMB_MODAL_MANAGER_CONTEXT, type UmbModalManagerContext } from '@umbraco-cms/backoffice/modal';
import type { PublicAccessResponseModel } from '@umbraco-cms/backoffice/backend-api';

export class UmbDocumentPublicAccessEntityAction extends UmbEntityActionBase<UmbDocumentPublicAccessRepository> {
	#modalContext?: UmbModalManagerContext;

	constructor(host: UmbControllerHostElement, repositoryAlias: string, unique: string) {
		super(host, repositoryAlias, unique);

		this.repository = new UmbDocumentPublicAccessRepository(this);

		this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (instance) => {
			this.#modalContext = instance as UmbModalManagerContext;
		});
	}

	async execute() {
		// TODO: API ERROR - SET IT UP WITH REPOSITORY
		// await this.repository?.readPublicAccess(this.unique);
		const mock: PublicAccessResponseModel = {
			loginPageId: '1234567890',
			errorPageId: '0987654321',
			members: [],
			groups: [],
		};
		this._openModal(mock);
	}

	private async _openModal(data: PublicAccessResponseModel) {
		this.#modalContext?.open(UMB_PUBLIC_ACCESS_MODAL, { data: { data } });
	}
}
