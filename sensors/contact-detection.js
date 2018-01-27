'use strict';

const Thing = require('../thing');
const Sensor = require('./sensor');
const { boolean } = require('../values');

module.exports = Thing.mixin(Parent => class extends Parent.with(Sensor) {
	static get capability() {
		return 'contact-detection';
	}

	static availableAPI(builder) {
		builder.event('contactDetectedChanged')
			.type('boolean')
			.description('Change in detected contact')
			.done();

		builder.event('opened')
			.description('Contact sensor is open, contact has been lost')
			.done();

		builder.event('closed')
			.description('Contact sensor is closed, contact has been detected')
			.done();

		builder.action('contactDetected')
			.description('Get if contact is currently detected')
			.returns('boolean', 'Current contact status')
			.done();

		builder.action('isOpen')
			.description('Get if the contact indicates an open state')
			.returns('boolean', 'If open - no contact detected')
			.done();

		builder.action('isClosed')
			.description('Get if the contact indicates a cloded state')
			.returns('boolean', 'If closed - contact detected')
			.done();
	}

	get sensorTypes() {
		return [ ...super.sensorTypes, 'contactDetected' ];
	}

	contactDetected() {
		return this.value('contactDetected');
	}

	isOpen() {
		return this.contactDetected()
			.then(v => ! v);
	}

	isClosed() {
		return this.contactDetected();
	}

	updateContactDetected(contact) {
		contact = boolean(contact);
		if(this.updateValue('contactDetected', contact)) {
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
