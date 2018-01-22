'use strict';

const Thing = require('../thing');

module.exports = Thing.mixin(Parent => class extends Parent {

	static get type() {
		return 'wall-controller';
	}

});
