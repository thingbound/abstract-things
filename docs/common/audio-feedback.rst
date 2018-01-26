``cap:audio-feedback`` - if thing emits audio feedback
======================================================

``audio-feedback`` is used by things that can report if they emit audio
feedback or not. Such feedback can be as simple as beeping when certain buttons
are pressed or when certain actions are performed. It may also be more advanced
audio such as spoken commands. This capability is commonly paired with
:doc:`adjustable-audio-feedback <adjustable-audio-feedback>` if the the thing
support toggling audio feedback on and off.

.. sourcecode:: js

	if(thing.matches('cap:audio-feedback')) {
		console.log('Audio feedback on:', await thing.audioFeedback());

		thing.on('audioFeedbackChanged', on => console.log('Audio feedback is now:', on));
	}

API
---

.. js:function:: audioFeedback()

	Get if the thing emits audio feedback.

	:returns:
		Promise that resolves to a :doc:`boolean </values/boolean>`
		representing if audio feedback is enabled.

	Example:

	.. sourcecode:: js

		thing.audioFeedback()
			.then(on => ...)
			.catch(...);

		const on = await thing.audioFeedback();

Events
------

.. describe:: audioFeedbackChanged

	The current audio feedback state has changed. Payload will be if the
	feedback is enabled.


	.. sourcecode:: js

		thing.on('audioFeedbackChanged', on => ...)

Protected methods
-----------------

.. js:function:: updateAudioFeedback(enabled)

	Update if audio feedback is currently enabled.

	:param boolean enabled: If the feedback is enabled.

Implementing capability
-----------------------

This capability requires that the implementors calls ``updateAudioFeedback``
when changes are detected.

Example:

.. sourcecode:: js

	const { Thing, AudioFeedback } = require('abstract-things');

	class Example extends Thing.with(AudioFeedback) {

	}
