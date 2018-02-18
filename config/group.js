'use strict';

module.exports = class Group {

	constructor(id, def) {
		this.id = id;

		this.children = [];
	}

	get(id) {
		for(const child of this.children) {
			if(child.id === id) {
				return child;
			}
		}

		return null;
	}

	add(item) {
		this.children.push(item);
	}
};
