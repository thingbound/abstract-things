'use strict';

const Thing = require('../thing');
const State = require('./state');
const { boolean } = require('../values');

module.exports = Thing.mixin(Parent => class extends Parent.with(State) {
	static get capability() {
		return 'audio-feedback';
	}

	static availableAPI(builder) {
		builder.event('audioFeedbackChanged')
			.type('boolean')
			.description('Audio feedback is either enabled or disabled')
			.done();

		builder.action('audioFeedback')
			.description('Get if the thing emits audio feedback')
			.returns('boolean', 'If audio feedback is enabled')
			.done();
	}

	audioFeedback() {
		return Promise.resolve(this.getState('audioFeedback'));
	}

	updateAudioFeedback(enabled) {
		enabled = boolean(enabled, true);

		if(this.updateState('audioFeedback', enabled)) {
			this.emitEvent('audioFeedbackChanged', enabled);
		}
	}
});
