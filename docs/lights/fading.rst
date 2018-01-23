``cap:fading`` - support for fading changes
===========================================

Capability used to mark lights that support fading of changes. When this
capability is present the ``duration`` argument for other methods is available.

.. sourcecode:: js

	if(thing.matches('type:light', 'cap:fading')) {
		// This light supports fading
		const time = await this.maxChangeTime();
		console.log('Maximum fading time in milliseconds:', time.ms);
	}

API
---

.. js:attribute:: maxChangeTime

	The maximum :doc:`duration </values/duration>` of time a change can be.

Protected methods
-----------------

.. js:function:: updateMaxChangeTime(time)

	:param duration time:
		The maximum time the light can fade as a
		:doc:`duration </values/duration>`.

	Example:

	.. sourcecode:: js

		this.updateMaxChangeTime('20s');

Implementing capability
-----------------------

Implementing this capability requires that the maximum change time is set
either in the constructor or in the ``initCallback()``.

Example:

.. sourcecode:: js

	const { Light, Fading } = require('abstract-things/lights');

	class Example extends Light.with(Fading) {

		initCallback() {
			return super.initCallback()
				// Set the maximum change time to 5 seconds
				.then(() => this.updateMaxChangeTime('5s'));
		}

	}
