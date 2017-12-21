'use strict';

const Thing = require('../thing');
const State = require('../common/state');

/**
 * Controller, such as switches and remote controls.
 */
module.exports = Thing.type(Parent => class extends Parent.with(State) {
	static get type() {
		return 'controller';
	}

	static availableAPI(builder) {
		builder.state('actions')
			.description('Actions that the controller can emit')
			.type('array')
			.done();

		builder.event('actions')
			.description('The supported actions have changed')
			.type('array')
			.done();

		builder.event('action')
			.description('A certain action has been triggered')
			.type('string')
			.done();

		builder.event('action:<id>')
			.description('Action with the given id has been triggered')
			.done();

		builder.action('actions')
			.description('Get the actions that this controller can emit')
			.returns('array')
			.done();
	}

	constructor(...args) {
		super(...args);

		this.updateState('actions', []);
	}

	/**
	* Emit the given action for this controller.
	*
	* @param {string} action
	*/
	emitAction(action, extra={}) {
		this.emitEvent('action', { action: action, data: extra }, { multiple: true });
		this.emitEvent('action:' + action, extra, { multiple: true });
	}

	/**
	 * Get the available actions for this controller. All of these actions
	 * can be emitted.
	 */
	actions() {
		return this.getState('actions');
	}

	/**
	 * Update the available actions of the controller.
	 */
	updateActions(actions) {
		if(this.updateState('actions', actions)) {
			this.emitEvent('actions', actions);
		}
	}
});
