import { map, Observable } from 'rxjs';
import type { UserDetails, UserEntity } from '../../models';
import { UmbEntityStore } from '../entity.store';
import { UmbDataStoreBase } from '../store';

/**
 * @export
 * @class UmbUserStore
 * @extends {UmbDataStoreBase<UserEntity>}
 * @description - Data Store for Users
 */
export class UmbUserStore extends UmbDataStoreBase<UserDetails> {
	private _entityStore: UmbEntityStore;

	constructor(entityStore: UmbEntityStore) {
		super();
		this._entityStore = entityStore;
	}

	getAll(): Observable<Array<UserDetails>> {
		// TODO: use Fetcher API.
		// TODO: only fetch if the data type is not in the store?
		fetch(`/umbraco/backoffice/users`)
			.then((res) => res.json())
			.then((data) => {
				this.update(data.items);
			});

		return this.items;
	}

	/**
	 * @description - Request a Data Type by key. The Data Type is added to the store and is returned as an Observable.
	 * @param {string} key
	 * @return {*}  {(Observable<DataTypeDetails | null>)}
	 * @memberof UmbDataTypeStore
	 */
	getByKey(key: string): Observable<UserDetails | null> {
		// TODO: use Fetcher API.
		// TODO: only fetch if the data type is not in the store?
		fetch(`/umbraco/backoffice/users/${key}`)
			.then((res) => res.json())
			.then((data) => {
				this.update([data]);
			});

		return this.items.pipe(
			map((items: Array<UserDetails>) => items.find((node: UserDetails) => node.key === key) || null)
		);
	}

	/**
	 * @description - Save a Data Type.
	 * @param {Array<DataTypeDetails>} dataTypes
	 * @memberof UmbDataTypeStore
	 * @return {*}  {Promise<void>}
	 */
	async save(users: Array<UserDetails>): Promise<void> {
		// TODO: use Fetcher API.
		try {
			const res = await fetch('/umbraco/backoffice/users/save', {
				method: 'POST',
				body: JSON.stringify(users),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const json = await res.json();
			this.update(json);
			this._entityStore.update(json);
		} catch (error) {
			console.error('Save Data Type error', error);
		}
	}

	// public updateUser(user: UserItem) {
	// 	const users = this._users.getValue();
	// 	const index = users.findIndex((u) => u.key === user.key);
	// 	if (index === -1) return;
	// 	users[index] = { ...users[index], ...user };
	// 	console.log('updateUser', user, users[index]);
	// 	this._users.next(users);
	// 	this.requestUpdate('users');
	// }

	// public inviteUser(name: string, email: string, userGroup: string, message: string): UserItem {
	// 	const users = this._users.getValue();
	// 	const user = {
	// 		id: this._users.getValue().length + 1,
	// 		key: uuidv4(),
	// 		name: name,
	// 		email: email,
	// 		status: 'invited',
	// 		language: 'en',
	// 		updateDate: new Date().toISOString(),
	// 		createDate: new Date().toISOString(),
	// 		failedLoginAttempts: 0,
	// 		userGroup: userGroup,
	// 	};
	// 	this._users.next([...users, user]);
	// 	this.requestUpdate('users');

	// 	//TODO: Send invite email with message
	// 	return user;
	// }

	// public deleteUser(key: string) {
	// 	const users = this._users.getValue();
	// 	const index = users.findIndex((u) => u.key === key);
	// 	if (index === -1) return;
	// 	users.splice(index, 1);
	// 	this._users.next(users);
	// 	this.requestUpdate('users');
	// }
}
