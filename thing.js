'use strict';

const { Class, Mixin, toExtendable, mix } = require('foibles');
const { EventEmitter } = require('./events');
const DefinitionBuilder = require('./utils/define-api');
const debug = require('debug');

const Metadata = require('./metadata');
const merge = require('./utils/merge');

/**
 * Go through the prototype chain of a class looking for information that
 * is used to create metadata about an instance.
 */
function collectMetadata(instance) {
	const metadata = new Metadata(instance);
	const builder = new DefinitionBuilder();

	let prototype = instance.constructor;
	while(prototype != Thing) {
		// static get types() { return [ 'typeA', 'typeB ] }
		const types = prototype.types;
		if(typeof types !== 'undefined') {
			if(! Array.isArray(types)) {
				metadata.addTypes(types);
			} else {
				metadata.addTypes(...types);
			}
		}

		// static get type() { return 'type' }
		const type = prototype.type;
		if(typeof type === 'string') {
			metadata.addTypes(type);
		}

		// static get capabilities() { return [ 'capA', 'capB ] }
		const capabilities = prototype.capabilities;
		if(typeof capabilities !== 'undefined') {
			if(! Array.isArray(capabilities)) {
				metadata.addCapabilities(capabilities);
			} else {
				metadata.addCapabilities(...capabilities);
			}
		}

		// static get capability() { return 'cap' }
		const capability = prototype.capability;
		if(typeof capability === 'string') {
			metadata.addCapabilities(capability);
		}

		const api = prototype.availableAPI;
		if(typeof api === 'function') {
			prototype.availableAPI(builder);
		} else if(Array.isArray(api)) {
			// If an array treat each entry as a name
			for(const action of api) {
				builder.action(action).done();
			}
		}

		prototype = Object.getPrototypeOf(prototype);
	}

	Object.assign(metadata, builder.done());
	return metadata;
}

const debugProperty = Symbol('debug');

const eventQueue = Symbol('eventQueue');
const eventEmitter = Symbol('eventEmitter');

const isInitialized = Symbol('isInitialized');
const isDestroyed = Symbol('isDestroyed');

const Thing = module.exports = toExtendable(class Thing {
	constructor() {
		this.metadata = collectMetadata(this);

		this[eventQueue] = [];
		this[eventEmitter] = new EventEmitter({
			context: this
		});
	}

	init() {
		if(this[isInitialized]) return Promise.resolve(this);

		this[isInitialized] = true;
		return Promise.resolve(this.initCallback())
			.then(() => this);
	}

	initCallback() {
		return Promise.resolve();
	}

	/**
	 * Destroy this appliance, freeing any resources that it is using.
	 */
	destroy() {
		if(! this[isInitialized] || this[isDestroyed]) return Promise.resolve();

		this[isDestroyed] = true;
		this[isInitialized] = false;
		return Promise.resolve(this.destroyCallback())
			.then(() => undefined);
	}

	destroyCallback() {
		return Promise.resolve();
	}

	/**
	 * Emit an event with the given name and data.
	 *
	 * @param {string} event
	 * @param {*} data
	 */
	emitEvent(event, data, options) {
		const queue = this[eventQueue];

		// Metadata may emit events before the queue is availabe, skip them
		if(! queue) return;

		const shouldQueueEmit = queue.length === 0;

		const multiple = options ? options.multiple : false;
		if(! multiple) {
			// Check if there is already an even scheduled
			const idx = queue.findIndex(e => e[0] === event);
			if(idx >= 0) {
				// Remove the event - only a single event can is emitted per tick
				queue.splice(idx, 1);
			}
		} else if(typeof multiple === 'function') {
			// More advanced matching using a function
			for(let i=0; i<queue.length; i++) {
				const e = queue[i];
				if(e[0] === event && multiple(e[1])) {
					// This event matches, remove it
					queue.splice(i, 1);
					break;
				}
			}
		}

		// Add the event to the queue
		queue.push([ event, data ]);

		if(shouldQueueEmit) {
			// Schedule emittal of the events
			setImmediate(() => {
				const emitter = this[eventEmitter];
				for(const e of queue) {
					emitter.emit(e[0], e[1], this);
				}

				this[eventQueue] = [];
			});
		}
	}

	on(event, listener) {
		return this[eventEmitter].on(event, listener);
	}

	off(event, listener) {
		return this[eventEmitter].off(event, listener);
	}

	onAny(listener) {
		return this[eventEmitter].onAny(listener);
	}

	offAny(listener) {
		return this[eventEmitter].offAny(listener);
	}

	debug() {
		if(! this[debugProperty]) {
			this[debugProperty] = debug('thing:' + this.id);
		}

		this[debugProperty].apply(this[debugProperty], arguments);
	}

	/**
	 * Check if this appliance matches all of the given tags.
	 */
	matches(...tags) {
		return this.metadata.matches(...tags);
	}

	/**
	 * Create a new type that can be mixed in with Appliance.
	 *
	 * @param {function} func
	 */
	static type(func) {
		return Class(Thing, func);
	}

	/**
	 * Create a new capability that can be mixed in with a Appliance.
	 *
	 * @param {function} func
	 */
	static capability(func) {
		return Mixin(func);
	}

	/**
	 * Mixin the given mixins to the specified object.
	 *
	 * @param {*} obj
	 * @param {array} mixins
	 */
	static mixin(obj, ...mixins) {
		const direct = Object.getPrototypeOf(obj);
		const parent = Object.getPrototypeOf(direct);

		const proto = {};
		for(let name of Object.getOwnPropertyNames(direct)) {
			proto[name] = direct[name];
		}
		const base = mix(parent.constructor, ...mixins);
		Object.setPrototypeOf(proto, base.prototype);

		Object.setPrototypeOf(obj, proto);

		const data = new base();
		merge(obj, data);
	}

	/**
	 * Extend this appliance with the given mixin. Used to dynamically apply
	 * capabilities during instance construction.
	 *
	 * @param {array} mixins
	 */
	extendWith(...mixins) {
		Thing.mixin(this, ...mixins);
	}
});
