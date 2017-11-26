'use strict';

const Thing = require('./thing');
const Nameable = require('./nameable');
const Storage = require('./storage');

/**
 * Capability for things that store their own name in the storage.
 */
module.exports = Thing.capability(Appliance => class extends Appliance.with(Nameable, Storage) {
	constructor(...args) {
		super(...args);
	}

	init() {
		return super.init()
			.then(() => this.storage.get('name'))
			.then(name => this.metadata.name = name);
	}

	changeName(name) {
		return this.storage.set('name', name);
	}
});
