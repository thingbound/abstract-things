'use strict';

const Thing = require('../thing');
const AudioFeedback = require('./audio-feedback');
const { boolean } = require('../values');

module.exports = Thing.mixin(Parent => class extends Parent.with(AudioFeedback) {

	static get capability() {
		return 'switchable-audio-feedback';
	}

	static availableAPI(builder) {
		builder.action('audioFeedback')
			.description('Get if the thing emits audio feedback')
			.argument('boolean', true, 'Optional boolean to switch audio feedback on or off')
			.returns('boolean', 'If audio feedback is enabled')
			.done();

		builder.action('setAudioFeedback')
			.description('Set if thing emits audio feedback')
			.argument('boolean', false, 'Boolean indicating if audio feedback is enabled')
			.returns('boolean', 'If audio feedback is enabled')
			.done();

		builder.action('toggleAudioFeedback')
			.description('Toggle the current audio feedback state')
			.returns('boolean', 'If audio feedback is enabled')
			.done();
	}

	audioFeedback(enabled) {
		if(typeof enabled === 'undefined') {
			return super.audioFeedback();
		}

		return this.setAudioFeedback(enabled);
	}

	setAudioFeedback(enabled) {
		try {
			enabled = boolean(enabled, true);

			return Promise.resolve(this.changeAudioFeedback(enabled))
				.then(() => this.audioFeedback());
		} catch(ex) {
			return Promise.reject(ex);
		}
	}

	toggleAudioFeedback() {
		return this.audioFeedback()
			.then(on => this.setAudioFeedback(! on));
	}

	changeAudioFeedback(speed) {
		throw new Error('changeAudioFeedback not implemented');
	}

});
