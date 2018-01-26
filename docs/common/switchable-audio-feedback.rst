``cap:switchable-audio-feedback`` - enable or disable audio feedback
====================================================================

The ``switchable-audio-feedback``-capability is an extension to the
:doc:`audio-feedback-capability <audio-feedback>` for things that can also
switch the audio feedback on or off.

.. sourcecode:: js

	if(thing.matches('cap:switchable-audio-feedback')) {
		console.log('Feedback is on', await thing.audioFeedback());

		// Disable the audio feedback
		await thing.audioFeedback(false);
	}

API
---

.. js:function:: audioFeedback([enabled])

	Get or set if the audio feedback is enabled.

	:param boolean enabled:
		Optional :doc:`boolean </values/boolean>` to change audio feedback to.
	:returns:
		Promise that resolves to the current audio feedback state.

	Example:

	.. sourcecode:: js

		// Getting returns a boolean
		const noisy = await thing.audioFeedback();

		// Turn audio feedback on
		thing.audioFeedback(true)
			.then(on => ...)
			.catch(...);

.. js:function:: setAudioFeedback(enabled)

	Set if audio feedback is enabled.

	:param boolean enabled:
		The new audio feedback state as a :doc:`boolean </values/boolean>`.
	:returns:
		Promise that resolves to the new audio feedback state.

	Example:

	.. sourcecode:: js

		thing.setAudioFeedback(true)
			.then(on => ...)
			.catch(...);

.. js:function:: toggleAudioFeedback()

	Toggle if audio feedback is enabled.

	:returns:
		Promise that resolves to the new audio feedback state.

	Example:

	.. sourcecode:: js

		thing.toggleAudioFeedback()
			.then(on => ...)
			.catch(...);

Implementing capability
-----------------------

The ``switchable-audio-feedback``-capability requires that the function
``changeAudioFeedback`` is implemented.

Example:

.. sourcecode:: js

	const { Thing, SwitchableAudioFeedback } = require('abstract-things');

	class Example extends Thing.with(SwitchableAudioFeedback) {
		constructor() {
			super();

			// Make sure to initialize the state via updateAudioFeedback
		}

		changeAudioFeedback(enabled) {
			/*
			 * This method is called whenever a audio feedback change is requested.
			 */
			 return switchWithPromise(enabled)
			 	.then(() => this.updateAudioFeedback(enabled));
		}
	}
