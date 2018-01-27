``cap:contact-detection`` - contact sensing
===========================================

This capability is used to mark sensors that report if contact is
detected, such as for door and window sensors that detect if the door or
window is open.

.. sourcecode:: js

	if(thing.matches('cap:contact-detection')) {
		console.log('Has contact:', await thing.contactDetected());

		thing.on('contactDetectedChanged', v => console.log('Contact is now:', c));
	}

API
---

.. js:function:: contactDetected()

	:doc:`Boolean </values/boolean>` representing if the sensor is currently
	detecting contact.

	:returns:
		Promise that resolves to if the sensor is detecting contact.

	Example:

	.. sourcecode:: js

		if(await thing.contactDetected()) {
			console.log('Thing has detected contact');
		}

.. js:function:: isOpen()

	:doc:`Boolean </values/boolean>` representing if the sensor is currently
	open (not detecting contact).

	:returns:
		Promise that resolves to if the sensor is in an open state.

	Example:

	.. sourcecode:: js

		console.log('Is open:', await thing.isOpen());

.. js:function:: isClosed()

	:doc:`Boolean </values/boolean>` representing if the sensor is currently
	closed (detecting contact).

	:returns:
		Promise that resolves to if the sensir is in a closed state.

	Example:

	.. sourcecode:: js

		console.log('Is closed:', await thing.isClosed());
Events
------

.. js:data:: contactDetectedChanged

	The contact value has changed. Payload is the new contact state as a
	:doc:`boolean </values/boolean>`.

	Example:

	.. sourcecode:: js

		thing.on('contactDetectedChanged', v => console.log('Contact is now:', c));

.. js:data:: opened

	The sensor has detected it is does not have contact and is now opened.

	Example:

	.. sourcecode:: js

		thing.on('opened', v => console.log('Sensor is now open'));

.. js::data:: closed

	The sensor has detect it has contact is is now closed.

	Example:

	.. sourcecode:: js

		thing.on('closed', v => console.log('Sensor is now closed'));

Protected methods
-----------------

.. js:function:: updateContactDetected(value)

	Update if the sensor is currently detecting contact.

	:param value:
		The new contact status as a :doc:`boolean </values/boolean>`.

	Example:

	.. sourcecode:: js

		// Set the sensor to open
		this.updateContactDetected(false);

Implementing capability
-----------------------

Implementors of this capability should call ``updateContact`` whenever the
contact state changes.

.. sourcecode:: js

	const { Sensor, ContactDetection } = require('abstract-things/sensors');

	class Example extends Sensor.with(ContactDetection) {

		constructor() {
			super();

			this.updateContactDetected(true);
		}

	}
