'use strict';

const EMPTY_FUNC = function() {};
const mergePath = require('./mergePath');
const { getValue, setValue } = require('./symbols');

/**
 * Configuration property.
 */
module.exports = class Property {

	constructor(group, id, def) {
		this.group = group;

		this.id = id;
		this.def = def;

		this.thing = group.thing;
		this.key = mergePath(group.key, id);

		this.type = def.type;

		this.setter = def.setter ? def.setter.bind(group.thing) : EMPTY_FUNC;
		this.onUpdate = def.onUpdate ? def.onUpdate.bind(group.thing) : EMPTY_FUNC;
		this.loader = def.loader ? def.loader.bind(group.thing) : EMPTY_FUNC;

		// Add this property to the group
		group.add(this);
	}

	/**
	 * Get the current value.
	 */
	get() {
		return this.group[getValue](this.key);
	}

	/**
	 * Load the value.
	 */
	async load() {
		// Load via the loader function
		const v = await this.loader();

		// Update the value from the initial load
		return this.update(
			// If no value was loaded fallback to the default value
			typeof v === 'undefined' ? this.def.value : v
		);
	}

	/**
	 * Set the current value.
	 *
	 * @param {*} v
	 */
	async set(v) {
		// Call the setter function to update the value
		await this.def.setter(v);

		// Fetch the updated value
		return this.get();
	}

	/**
	 * Change the current value.
	 *
	 * @param {*} v
	 */
	async update(value) {
		// Convert the value into the correct type
		value = typeof value === undefined ? undefined : this.type(value);

		// Set the value and emit an event if it changes
		if(this.group[setValue](this.key, value)) {
			// Call the onUpdate handler and let it perform updates
			await this.onUpdate(value);

			// Emit configPropertyUpdated event when onChange is done
			this.thing.emitEvent('configPropertyUpdated', {
				key: this.key,
				value: value
			});
		}
	}

	getDescription() {
		return {
			id: this.id,
			path: this.key,

			name: this.def.name,
			description: this.def.description,

			type: this.def.typeName,
			context: this.def.context,

			defaultValue: this.def.value,
			currentValue: this.get()
		};
	}
};
