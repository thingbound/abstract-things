Handling events
===============

Events are emitted quite often by capabilities. In most cases the capability
will automatically emit events as needed, but when implementing custom
capabilities simply call ``emitEvent``.

API
---

.. js:function:: emitEvent(name[, payload[, options]])

	Emit an event with the given name. By default only a single event will be
	emitted during a tick. So doing ``emitEvent('test')`` twice in a row will
	only emit a single event, see the options to change the behavior.

	:param string name: The name of the event.
	:param payload:
		Optional payload of the event. Can be any object that can be converted to
		JSON. If omitted will be equal to ``null``.

	:param options:
		Optional object containing options for event emittal. The only option
		available is ``multiple`` which can be set to allow multiple events
		to be emitted during the same tick.

	Example:

	.. sourcecode:: js

		this.emitEvent('test');
		this.emitEvent('rotation', angle(102));
		this.emitEvent('action', { name: 'test' });
		this.emitEvent('test', null, { multiple: true });

For information about how to listen for events see :doc:`../using-things`.

Common patterns
---------------

It is recommended to emit as few events as possible, such as only emitting an
event when something changes.

As many capabilities extend :doc:`state <../common/state>` a common pattern for
event emittal looks something like this:

.. sourcecode:: js

	updatePower(newPowerValue) {
		if(this.updateState('power', newPowerValue)) {
			// Emit event if new value was different from the previous value
			this.emitEvent('power', newPowerValue);
		}
	}
