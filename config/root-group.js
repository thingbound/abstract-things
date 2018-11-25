'use strict';

const Group = require('./group');
const { getValue, setValue } = require('./symbols');

/**
 * Extension for group that works as the root. Will keep track of the actual
 * configuration data.
*/
module.exports = class RootGroup extends Group {

	constructor(thing, data) {
		super();

		this.thing = thing;
		this.data = new Map();
	}

	[setValue](id, value) {
		return this.data.set(id, value);
	}

	[getValue](id) {
		return this.data.get(id);
	}

	getDescription() {
		const result = {
			children: []
		};

		for(const child of this.children) {
			result.children.push(child.getDescription());
		}

		return result;
	}
};
