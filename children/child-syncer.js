'use strict';

module.exports = class ChildSyncer {

	constructor(parent, syncFunction) {
		this.parent = parent;
		this.syncFunction = syncFunction;

		this.children = new Map();
	}

	update(definitions) {
		if(! definitions || ! definitions[Symbol.iterator]) throw new Error('Definitions that are iterable are needed to synchronize');

		const promises = [];

		const children = this.children;
		const allIds = new Set();
		for(const def of definitions) {
			if(! def.id) {
				throw new Error('`id` is needed on definitions');
			}

			allIds.add(def.id);

			if(! children.has(def.id)) {
				// This child does not exist, create and register it
				const child = this.syncFunction(def, null);
				if(child) {
					const promise = child.init()
						.then(() => {
							children.set(def.id, child);
							this.parent.addChild(child);
						});

					promises.push(promise);
				}
			} else {
				const child = this.syncFunction(def, children.get(def.id));
				if(! child) {
					const current = children.get(def.id);

					children.delete(def.id);
					this.removeChild(current.id);
				}
			}
		}

		// Remove all the ids that are no longer present
		for(const id of children.keys()) {
			if(! allIds.has(id)) {
				const current = children.get(id);

				children.delete(id);
				this.removeChild(current.id);
			}
		}

		return Promise.all(promises);
	}
};
