``cap:dimmable`` - change brightness
====================================

Capability used when a light supports changing the brightness, extends
:doc:`brightness <brightness>`-capability.

.. sourcecode:: js

	if(thing.matches('cap:dimmable')) {
		// Get the current brightness
		console.log(thing.brightness());

		// Set the current brightness
		thing.brightness(10)
			.then(bri => console.log('Brightness is now', bri))
			.catch(err => console.log('Could not change brightness', err));
	}

API
---

.. js:function:: brightness([brightnessChange[, duration]])

	Get or change the brightness of the light. Setting the brightness to zero
	will power off the light. Setting the brightness to non-zero such as when
	increasing the brightness will turn it on.

	:param percentage brightnessChange:
		Optional brightness :doc:`percentage </values/percentage>` to set as a
		number or a change in brightness as a string. ``20`` would be 20%
		brightness, ``'+10'`` would be an increase of 10%.
	:param Duration duration:
		Optional :doc:`duration </values/duration>` to perform change in
		brightness over. Supported when the light has the
		:doc:`fading <fading>`-capability.
	:returns: Current brightness when getting, promise when setting.

	Example:

	.. sourcecode:: js

		// Get the current brightness
		const currentBrightness = thing.brightness();

		// Set a specific brightness
		thing.brightness(20)
			.then(bri => console.log('Brightness is now', bri))
			.catch(err => console.log('Error while setting', err));

		// Increase the brightness
		thing.brightness('+10')
			.then(...)
			.catch(...);

		// Set the brightness over 2 seconds (if cap:fading)
		thing.brightness(70, '2s')
			.then(...)
			.catch(...);

.. js:function:: setBrightness(brightness[, duration])

	Set the brightness of the light. Setting the brightness to zero will
	power off the light. Setting the brightness to non-zero such as when
	increasing the brightness will turn it on.

	:param percentage brightness:
		The brightness as a :doc:`percentage </values/percentage>` the light
		should try to set.
	:param Duration duration:
		Optional :doc:`duration </values/duration>` to perform change in
		brightness over. Supported when the light has the
		:doc:`fading <fading>`-capability.
	:returns: Promise resolving to the new brightness.

	Example:

	.. sourcecode:: js

		thing.setBrightness(20)
			.then(bri => console.log('Brightness is now', bri))
			.catch(err => console.log('Error while setting', err));

.. js:function:: increaseBrightness(amount[, duration])

	Increase the brightness of the light. This will turn on the light.

	:param percentage amount:
		The amount as a :doc:`percentage </values/percentage>` to increase the
		brightness.
	:param Duration duration:
		Optional :doc:`duration </values/duration>` to perform change in
		brightness over. Supported when the light has the
		:doc:`fading <fading>`-capability.
	:returns: Promise that resolves to the new brightness.

	Example:

	.. sourcecode:: js

		thing.increaseBrightness(15)
			.then(bri => console.log('Brightness is now', bri))
			.catch(err => console.log('Error while setting', err));

.. js:function:: decreaseBrightness(amount[, duration])

	Decrease the brightness of the light. Decreasing to zero will power off
	the light.

	:param percentage amount:
		The amount as a :doc:`percentage </values/percentage>` to decrease the
		brightness.
	:param Duration duration:
		Optional :doc:`duration </values/duration>` to perform change in
		brightness over. Supported when the light has the
		:doc:`fading <fading>`-capability.
	:returns: Promise that resolves to the new brightness.

	Example:

	.. sourcecode:: js

		thing.decreaseBrightness(15)
			.then(bri => console.log('Brightness is now', bri))
			.catch(err => console.log('Error while setting', err));

Protected methods
-----------------

.. js:function:: changeBrightness(targetBrightness, options)

	*Abstract*. Change the brightness of the light. Implementations need to
	supports the following:

	* If ``targetBrightness`` is zero the light should be turned off.
	* If ``options.powerOn`` is ``true`` the light should be powered on.
	* ``options.duration`` should be respected if the light supports fading.

	:param number targetBrightness:
		The :doc:`percentage </values/percentage>` the brightness should be.
	:param options:
		Options for changing the brightness. Two options are available,
		``duration`` (of type :doc:`duration </values/duration>`) which is the
		requested duration of the change and ``powerOn`` (of type
		:doc:`boolean </values/boolean>`) which indicates if the power should
		be switched on if the thing is off.
	:returns: Promise if change is asynchronous.

	Example:

	.. sourcecode:: js

		changeBrightness(targetBrightness, options) {
			const duration = options.duration.ms;
			const shouldPowerOn = options.powerOn;

			return ...
		}

Implementing capability
-----------------------

In addition to updating the brightness whenever it changes externally as
outlined in the :doc:`brightness <brightness>`-capability. The method
``changeBrightness`` needs to be implemented.

.. sourcecode:: js

	const { Light, Dimmable } = require('abstract-things/lights');

	class Example extends Light.with(Dimmable) {

		changeBrightness(targetBrightness, options) {
			// Duration to use if this light supports fading
			const duration = options.duration.ms;

			// If the light should be powered on if it is off
			const shouldPowerOn = options.powerOn;

			// Lazy way to handle turning the light on if is switchable
			let promise;
			if(shouldPowerOn && ! this.state.power) {
				promise = this.turnOn();
			} else if(brightness <= 0) {
				promise = this.turnOff();
			} else {
				promise = Promise.resolve();
			}

			// Then actually change the brightness
			return promise
				.then(() => actuallyChangeBrightness(...))
				.then(() => this.updateBrightness(targetBrightness));
		}

	}
