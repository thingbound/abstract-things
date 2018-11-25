'use strict';

const Thing = require('../thing');
const Storage = require('../storage');
const values = require('../values');

const RootGroup = require('./root-group');
const Group = require('./group');
const Property = require('./property');

const parsePath = require('./parsePath');

const description = Symbol('configDescription');

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

		builder.action('configDescription')
			.description('Get described configuration groups and values')
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

		this[description] = new RootGroup(this);
	}

	async configDescription() {
		return await this[description].getDescription();
	}

	async initCallback() {
		await super.initCallback();

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

		await Promise.all(promises);
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
	async config(key=undefined, value=undefined) {
		if(typeof key === 'undefined' && typeof value === 'undefined') {
			return this[description].getValues();
		}

		if(typeof value === 'undefined') {
			return this.getConfig(key);
		}

		return await this.setConfigProperty(key, value);
	}

	/**
	 * Get a specific configuration key. Protected use only.
	 *
	 * @param {string} key
	 */
	getConfig(key) {
		const value = this[description].get(key);
		if(value instanceof Group) {
			return value.getValues();
		} else if(value instanceof Property) {
			return value.get();
		}

		return null;
	}

	/**
	 * Set the value of a specific configuration key.
	 *
	 * @param {string} key
	 * @param {*} value
	 */
	async setConfigProperty(key, value) {
		const property = this[description].get(key);
		if(! (property instanceof Property)) {
			throw new Error('Property ' + key + ' does not exist');
		}

		return await property.set(value);
	}

	/**
	 * Set several configuration values at once.
	 */
	setConfig(data) {
		throw new Error('setConfig is not implemented yet');
	}

	findConfigProperty(key) {
		const property = this[description].get(key);
		if(! (property instanceof Property)) {
			throw new Error('Property ' + key + ' does not exist');
		}

		return property;
	}

	/**
	 * Define a group with configuration.
	 *
	 * @param {string} key
	 */
	defineConfigGroup(key) {
		const parts = parsePath(key);

		let group = this[description];
		if(parts.length > 1) {
			group = group.get(parts.slice(0, parts.length - 1));

			if(! group) {
				throw new Error('Parent of the configuration property `' + key + '` does not exist');
			} else if(! (group instanceof Group)) {
				throw new Error('Parent of the configuration property `' + key + '` is not a group');
			}
		}

		const id = parts[parts.length - 1];

		return new ConfigGroupBuilder(def => {
			new Group(group, id, def);
			return this;
		});
	}

	/**
	 * Define an individual configuration property.
	 */
	defineConfigProperty(key) {
		const parts = parsePath(key);

		let group = this[description];
		if(parts.length > 1) {
			group = group.get(parts.slice(0, parts.length - 1));

			if(! group) {
				throw new Error('Parent of the configuration property `' + key + '` does not exist');
			} else if(! (group instanceof Group)) {
				throw new Error('Parent of the configuration property `' + key + '` is not a group');
			}
		}

		const id = parts[parts.length - 1];

		return new ConfigDefBuilder((def, required) => {
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

			const property = new Property(group, id, def);
			return property;
		});
	}
});

class ConfigDefBuilder {
	constructor(receiver, path) {
		this.receiver = receiver;

		this.path = path;
		this.def = {
			typeName: 'mixed',
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

		this.def.typeName = type;
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
