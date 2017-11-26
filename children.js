'use strict';

const Thing = require('./thing');
const childrenSymbol = Symbol('children');

/**
 * Mixin that add support for child things. Children are used
 * primarily for things that bridge other networks, such as Zigbee, Z-wave
 * and Bluetooth networks.
 */
module.exports = Thing.capability(Parent => class extends Parent {

	constructor(...args) {
		super(...args);

		this[childrenSymbol] = new Map();
	}

	/**
	 * Add a child to this thing. The child should be an instance of
	 * `Thing` with a valid identifier.
	 *
	 * This will emit the event `thing:available` if this is a new
	 * child.
	 *
	 * @param {Thing} thing
	 */
	addChild(thing) {
		if(typeof thing !== 'object') throw new Error('Thing needs to be specified');

		if(! thing.id) {
			throw new Error('Child needs to have an `id`');
		}

		const children = this[childrenSymbol];
		const child = children.get(thing.id);
		if(child) {
			// Child is already present, might be that it is being replaced
			if(child !== thing) {
				// This is not the same instance, emit events
				children.set(thing.id, thing);
				this.emitEvent('thing:unavailable', child, { multiple: true });
				this.emitEvent('thing:available', thing, { multiple: true });
			}
		} else {
			children.set(thing.id, thing);
			this.emitEvent('thing:available', thing, { multiple: true });
		}
	}

	/**
	 * Remove a child. Can be used both with an instance of `Thing` and
	 * with an identifier.
	 *
	 * Will emit `thing:unavailable` if a child is removed.
	 *
	 * @param {Thing|string} thingOrId
	 */
	removeChild(thingOrId) {
		if(typeof thingOrId === 'undefined') throw new Error('Thing or identifier needs to be specified');
		const id = typeof thingOrId === 'string' ? thingOrId : thingOrId.id;

		const children = this[childrenSymbol];
		const child = children.get(id);

		if(child) {
			children.delete(id);
			this.emitEvent('thing:unavailable', child, { multiple: true });
		}
	}

	/**
	 * Get if the given child is registered.
	 *
	 * @param {Thing|string} thingOrId
	 */
	hasChild(thingOrId) {
		if(typeof thingOrId === 'undefined') throw new Error('Thing or identifier needs to be specified');
		const id = typeof thingOrId === 'string' ? thingOrId : thingOrId.id;

		return this[childrenSymbol].has(id);
	}

	/**
	 * Get a child based on its identifier.
	 *
	 * @param {string} id
	 */
	getChild(id) {
		return this[childrenSymbol].get(id);
	}

	/**
	 * Find a child via a filter.
	 *
	 * @param {function} filter
	 */
	findChild(filter) {
		for(const child of this[childrenSymbol].values()) {
			if(filter(child)) {
				return child;
			}
		}
		return null;
	}

	/**
	 * Get all of the children that are registered.
	 */
	get children() {
		return this[childrenSymbol].values();
	}

	/**
	 * Synchronize the children based on the given definitions. This will remove
	 * any child that is not in the list of definitions and create new ones
	 * for new definitions.
	 *
	 * @param {Iterable} defs
	 * @param {Function} func
	 */
	syncChildren(defs, func) {
		if(! defs || ! defs[Symbol.iterator]) throw new Error('Definitions that are iterable are needed to synchronize');
		if(typeof func !== 'function') throw new Error('A function that can create things from a definition is required');

		const children = this[childrenSymbol];
		const allIds = new Set();
		for(const def of defs) {
			if(! def.id) {
				throw new Error('`id` is needed on definitions');
			}

			allIds.add(def.id);

			if(! children.has(def.id)) {
				// This child does not exist, create and register it
				const child = func(null, def);
				if(child) {
					if(child.id != def.id) {
						throw new Error('Thing created has id ' + child.id + ' which differs from defintion id of ' + def.id);
					}
					this.addChild(child);
				}
			} else {
				const child = func(children.get(def.id), def);
				if(! child) {
					this.removeChild(child.id);
				}
			}
		}

		// Remove all the ids that are no longer present
		for(const id of this[childrenSymbol].keys()) {
			if(! allIds.has(id)) {
				this.removeChild(id);
			}
		}
	}
});
