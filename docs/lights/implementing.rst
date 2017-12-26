Implementing lights
===================

Protected methods
-----------------

.. js:function:: setLightState(state)

	Set the state of the light. Light capabilities use this as a hook for
	restoring state. If this is not overriden capabilities implement a default
	behavior.

	:param object state: The state to set.
	:returns: Promise that resolves when the state is set.

	Example:

	.. sourcecode

		setLightState(state) {
			return doCustomStateRestore(state);
		}

Power switching
---------------

To support proper restoring of power the implementors of lights should use
a custom ``SwitchablePower``:

.. sourcecode:: js

	const { Light, SwitchablePower } = require('abstract-things/lights');

	class Example extends Light.with(SwitchablePower) {

		changePower(power) {
			return changePowerOfLight(power);
		}

	}
