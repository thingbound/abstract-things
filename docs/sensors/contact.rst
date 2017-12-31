``cap:contact`` - contact sensing
==================================

This capability is used to mark sensors that report a wether contact is
detected, such as for door and window sensors that detect if the door or
window is open.

.. sourcecode:: js

	if(thing.matches('cap:contact')) {
		console.log('Has contact:', thing.contact);
	}

API
---

.. js:attribute:: contact

	:doc:`Boolean </values/boolean>` representing if the sensor is currently
	detecting contact.

	.. sourcecode:: js

		console.log('Contact is:', thing.contact);

.. js:attribute:: open

	:doc:`Boolean </values/boolean>` representing if the sensor is currently
	open (not detecting contact).

	.. sourcecode:: js

		console.log('Is open:', thing.open);

.. js:attribute:: closed

	:doc:`Boolean </values/boolean>` representing if the sensor is currently
	closed (detecting contact).

	.. sourcecode:: js

		console.log('Is closed:', thing.closed);
Events
------

.. js:data:: contactChanged

	The contact value has changed. Payload is the new contact state as a
	:doc:`boolean </values/boolean>`.

	.. sourcecode:: js

		thing.on('contactChanged', v => console.log('Contact is now:', c));

.. js:data:: opened

	The sensor has detected it is does not have contact and is now opened.

	.. sourcecode:: js

		thing.on('opened', v => console.log('Sensor is now open'));

.. js::data:: closed

	The sensor has detect it has contact is is now closed.

	.. sourcecode:: js

		thing.on('closed', v => console.log('Sensor is now closed'));

Protected methods
-----------------

.. js:function:: updateContact(value)

	Update if the sensor is currently detecting contact.

	:param value:
		The new contact status as a :doc:`boolean </values/boolean>`.

	Example:

	.. sourcecode:: js

		// Set the sensor to open
		this.updateContact(false);

Implementing capability
-----------------------

Implementors of this capability should call ``updateContact`` whenever the
contact state changes.

.. sourcecode:: js

	const { Sensor, Contact } = require('abstract-things/sensors');

	class Example extends Sensor.with(Contact) {

		constructor() {
			super();

			this.updateContact(true);
		}

	}
