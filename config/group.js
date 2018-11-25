'use strict';

const mergePath = require('./mergePath');
const parsePath = require('./parsePath');
const { getValue, setValue } = require('./symbols');

/**
 * Grouping of several network properties.
 */
module.exports = class Group {

	constructor(parent, id, def) {
		this.parent = parent;
		this.id = id;

		this.def = def;
		this.thing = parent && parent.thing;
		this.key = parent ? mergePath(parent.key, id) : '';

		this.children = [];

		// Add this property to the parent
		parent && parent.add(this);
	}

	/**
	 * Get a specific property or group from this group.
	 */
	findChild(id) {
		for(const child of this.children) {
			if(child.id === id) {
				return child;
			}
		}

		return null;
	}

	/**
	 * Add a property or group to this group.
	 */
	add(item) {
		for(const child of this.children) {
			if(child.id === item.id) {
				throw new Error('Duplicate group or property for key ' + mergePath(this.key, item.id));
			}
		}

		this.children.push(item);
	}

	/**
	 * Get a property defined in this group.
	 *
	 * @param {string} key
	 */
	get(key) {
		let parts;
		if(typeof key === 'string') {
			parts = parsePath(key);
		} else if(Array.isArray(key)) {
			parts = key;
		} else {
			throw new Error('Invalid key, need a string to parse or a pre-parsed path');
		}

		// Locate the value in the child array
		let value = null;
		for(const child of this.children) {
			if(child.id === parts[0]) {
				value = child;
				break;
			}
		}

		if(parts.length === 1) {
			// If this was the last part of a path, always return the found value
			return value;
		} else if(value instanceof Group) {
			// If the value was a group, try to descend in to it
			return value.get(parts.slice(1));
		}

		return null;
	}

	[getValue](key) {
		return this.parent[getValue](key);
	}

	/**
	 * Update the specific property in this group.
	 */
	[setValue](key, value) {
		return this.parent[setValue](key, value);
	}

	getValues() {
		const result = {};

		for(const child of this.children) {
			let value;
			if(child instanceof Group) {
				value = child.getValues();
			} else {
				value = child.get();
			}

			result[child.id] = value;
		}

		return result;
	}

	getDescription() {
		const result = {
			id: this.id,
			path: this.key,

			name: this.def && this.def.name,
			description: this.def && this.def.description,
			children: []
		};

		for(const child of this.children) {
			result.children.push(child.getDescription());
		}

		return result;
	}
};
