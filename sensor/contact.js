'use strict';

const Thing = require('../thing');
const Sensor = require('./sensor');
const { boolean } = require('../values');

module.exports = Thing.capability(Parent => class extends Parent.with(Sensor) {
	static get capability() {
		return 'contact';
	}

	static availableAPI(builder) {
		builder.event('contact')
			.type('boolean')
			.description('Change in detected contact')
			.done();

		builder.event('opened')
			.description('Contact sensor is open, contact has been lost')
			.done();

		builder.event('closed')
			.description('Contact sensor is closed, contact has been detected')
			.done();

		builder.action('contact')
			.description('Get if contact is currently detected')
			.getterForState('contact')
			.returns('boolean', 'Current contact status')
			.done();
	}

	get sensorTypes() {
		return [ ...super.sensorTypes, 'contact' ];
	}

	get motion() {
		return this.value('contact');
	}

	updateContact(contact) {
		contact = boolean(contact);
		if(this.updateValue('contact', contact)) {
			if(contact) {
				// Emit the closed event if contact is true
				this.emitEvent('closed');
			} else {
				// Emit the opened event if contact is false
				this.emitEvent('opened');
			}
		}
	}
});
