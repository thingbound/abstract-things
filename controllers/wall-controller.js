'use strict';

const Thing = require('../thing');
const Controller = require('./controller');

module.exports = Thing.mixin(Parent => class extends Parent.with(Controller) {

	static get type() {
		return 'wall-controller';
	}

});
