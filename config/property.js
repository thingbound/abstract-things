'use strict';

const EMPTY_FUNC = function() {};

/**
 * Configuration property.
 */
module.exports = class Property {

	constructor(thing, data, key, def) {
		this.thing = thing;
		this.data = data;

		this.id = key;
		this.key = key;
		this.def = def;

		this.type = def.type;

		this.setter = def.setter ? def.setter.bind(thing) : EMPTY_FUNC;
		this.onUpdate = def.onUpdate ? def.onUpdate.bind(thing) : EMPTY_FUNC;
		this.loader = def.loader ? def.loader.bind(thing) : EMPTY_FUNC;
	}

	/**
	 * Get the current value.
	 */
	get() {
		return this.data.get(this.key);
	}

	/**
	 * Load the value.
	 */
	load() {
		return Promise.resolve(this.loader())
			.then(v => {
				v = typeof v === 'undefined' ? this.def.value : v;

				return this.update(v);
			});
	}

	/**
	 * Set the current value.
	 *
	 * @param {*} v
	 */
	set(v) {
		return Promise.resolve(this.def.setter(v))
			.then(() => this.get());
	}

	/**
	 * Change the current value.
	 *
	 * @param {*} v
	 */
	update(value) {
		// Convert the value into the correct type
		value = typeof value === undefined ? undefined : this.type(value);

		// Set the value and emit an event if it changes
		if(this.data.set(this.key, value)) {
			// Call the onChange handler and let it perform updates
			return Promise.resolve(this.onUpdate(value))
				.then(() => {
					// Emit configPropertyUpdated event when onChange is done
					this.thing.emitEvent('configPropertyUpdated', {
						key: this.key,
						value: value
					});
				});
		}
	}
};
