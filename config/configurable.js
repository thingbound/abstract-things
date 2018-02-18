'use strict';

const Thing = require('../thing');
const Storage = require('../storage');
const values = require('../values');

const Data = require('./data');
const Group = require('./group');
const Property = require('./property');

const findGroup = require('./findGroup');
const findProperty = require('./findProperty');
const parsePath = require('./parsePath');

const description = Symbol('configDescription');
const data = Symbol('data');

/**
 * Mixin that makes a thing configurable. Configurable things support getting
 * and setting configuration properties.
 */
module.exports = Thing.mixin(Parent => class extends Parent.with(Storage) {

	static get capability() {
		return 'configurable';
	}

	static availableAPI(builder) {
		builder.event('configPropertyChanged')
			.type('object')
			.description('Configuration property has changed')
			.done();

		builder.action('config')
			.description('Get or set a configuration property')
			.argument('string', true, 'Optional property to get or set')
			.argument('mixed', true, 'Optional value to set')
			.done();

		builder.action('setConfigProperty')
			.description('Set a configuration property')
			.argument('string', false, 'Property to set')
			.argument('mixed', false, 'Value to set')
			.done();
	}

	constructor(...args) {
		super(...args);

		this[description] = new Group();
		this[data] = new Data();
	}

	configDescription() {
		return Promise.resolve(this[description]);
	}

	initCallback() {
		return super.initCallback()
			.then(() => {
				// TODO: Request loading of stored properties and set default values
				const promises = [];
				function initAll(group) {
					for(const v of group.children) {
						if(v instanceof Group) {
							initAll(v);
						} else {
							promises.push(v.load());
						}
					}
				}

				initAll(this[description]);

				return Promise.all(promises);
			});
	}

	/**
	 * Get the entire configuration, or get or set a specific configuration
	 * property.
	 *
	 * @param {string} key
	 *   Optional key of property to get or set.
	 * @param {*} value
	 *   Optional value to set for the given property key.
	 */
	config(key=undefined, value=undefined) {
		if(typeof key === 'undefined' && typeof value === 'undefined') {
			return Promise.resolve(this[data].asPlainObject());
		}

		if(typeof value === 'undefined') {
			return Promise.resolve(this.getConfig(key));
		}

		return this.setConfigProperty(key, value);
	}

	/**
	 * Get a specific configuration key. Protected use only.
	 *
	 * @param {string} key
	 */
	getConfig(key) {
		return this[data].get(key);
	}

	/**
	 * Set the value of a specific configuration key.
	 *
	 * @param {string} key
	 * @param {*} value
	 */
	setConfigProperty(key, value) {
		try {
			// Find the property that is being updated
			const property = findProperty(this[description], key);
			if(! property) {
				return Promise.reject(new Error('Property ' + key + ' does not exist'));
			}

			return property.set(value);
		} catch(ex) {
			return Promise.reject(ex);
		}
	}

	/**
	 * Set several configuration values at once.
	 */
	setConfig(data) {
		throw new Error('setConfig is not implemented yet');
	}

	/**
	 * Define a group with configuration.
	 *
	 * @param {*} group
	 */
	defineConfigGroup(group) {
		const parent = findGroup(this[description], group);
		if(! parent) {
			throw new Error('Parent of the configuration group does not exist');
		}

		return new ConfigGroupBuilder(def => {
			const parts = parsePath(group);
			const id = parts[parts.length - 1];

			parent.add(new Group(id, def));
			return this;
		});
	}

	defineConfig(key) {
		const parent = findGroup(this[description], key);
		if(! parent) {
			throw new Error('Parent of the configuration property does not exist');
		}

		return new ConfigDefBuilder((def, required) => {
			const parts = parsePath(key);
			const id = parts[parts.length - 1];

			if(def.stored) {
				def.setter = v => {
					/*
					 * Store the configuration value as an object to support
					 * default values.
					 */
					return this.storage.set('config.' + key, {
						value: v
					}).then(() => property.update(v));
				};

				def.loader = () => {
					/*
					 * Check if the value is truthy or not, otherwise it's not
					 * set.
					 */
					return this.storage.get('config.' + key)
						.then(v => v ? v.value : undefined);
				};
			}

			const property = new Property(this, this[data], id, def);
			parent.add(property);

			return property;
		});
	}
});

class ConfigDefBuilder {
	constructor(receiver) {
		this.receiver = receiver;

		this.def = {
			type: values.mixed
		};
	}

	/**
	 * Set the English name of this configuration key.
	 *
	 * @param {string} name
	 */
	name(name) {
		this.def.name = name;
		return this;
	}

	/**
	 * Set an optional English description of this configuration key.
	 *
	 * @param {string} label
	 */
	description(label) {
		this.def.description = label;
		return this;
	}

	/**
	 * Set the type of data this configuration key requires.
	 *
	 * @param {string} type
	 */
	type(type) {
		const v = values.get(type);
		if(! v) {
			throw new Error('The type ' + type + ' does not exist');
		}

		this.def.type = v;
		return this;
	}

	/**
	 * Set the function that should be called when a property is being set.
	 * Used to integrated with config properties stored non-locally such as
	 * on a device.
	 *
	 * @param {function} func
	 */
	setter(func) {
		if(this.def.stored) {
			throw new Error('Setters can not be used with stored properties, use onChange to listen for config changes');
		}

		this.def.setter = func;
		return this;
	}

	/**
	 * Set a function to call whenever the property is updated. Called when
	 * the property is changed, can be used together with stored properties
	 * to perform updates when a property changes.
	 *
	 * @param {function} func
	 */
	onUpdate(func) {
		this.def.onUpdate = func;
		return this;
	}

	/**
	 * Set the default value of the property.
	 */
	defaultValue(v) {
		this.def.value = v;
		return this;
	}

	/**
	 * Set the context of this configuration key.
	 *
	 * @param {string} context
	 */
	context(context) {
		this.def.context = context;
		return this;
	}

	/**
	 * Set that the value should be automatically stored and recalled.
	 */
	stored() {
		if(this.def.setter) {
			throw new Error('Stored config properties can not be used with setter, use onChange to listen for config changes');
		}

		this.def.stored = true;
		return this;
	}

	done() {
		// Convert the default value
		if(this.def.value) {
			this.def.value = this.def.type(this.def.value);
		}

		// Store the property
		return this.receiver(this.def);
	}
}

class ConfigGroupBuilder {
	constructor(receiver) {
		this.receiver = receiver;

		this.def = {};
	}

	/**
	 * Set the English name of this configuration key.
	 *
	 * @param {string} name
	 */
	name(name) {
		this.def.name = name;
		return this;
	}

	/**
	 * Set an optional English description of this configuration key.
	 *
	 * @param {string} label
	 */
	description(label) {
		this.def.description = label;
		return this;
	}

	done() {
		return this.receiver(this.def);
	}
}
