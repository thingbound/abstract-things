``cap:actions`` - emit events on actions
========================================

This capability is used when a thing support emitting events when an action
such a button press occurs.

.. sourcecode:: js

	if(thing.matches('cap:actions')) {
		// This thing supports actions
		thing.on('action', action => console.log('Action occurred:', action);

		// Listen for a specific action
		thing.on('action:test', () => console.log('Test action occurred');
	}

API
---

.. js:function:: actions();

	Get the actions that the thing supports.

	:returns:
		Promise that resolves to any array containing the actions as
		:doc:`codes </values/code>`.

	Example:

	.. sourcecode:: js

		const actions = await thing.actions();

		const action = actions[0];
		console.log('First action id:', action.id);

Events
------

.. describe:: actionsChanged

	The available actions have changed. Payload will be the same value that
	will be returned by the ``values`` attribute.

	Example:

	.. sourcecode:: js

		thing.on('actionsChanged', actions => console.log('Actions are now:', actions);

.. describe:: action

	An action has occurred. The payload is an object with the keys:

	* ``action`` - the identifier of the action
	* ``data`` - optional data of the action

	Example:

	.. sourcecode:: js

		thing.on('action', e => console.log('Action', e.action, 'with data', e.data));

.. describe:: action:<id>

	An action of type ``<id>`` has occurred. ``<id>`` will be a supported
	action, see the ``actions`` attribute for supported actions.

	.. sourcecode:: js

		thing.on('action:test', () => console.log('Test action occurred'));

Protected methods
-----------------

.. js:function:: updateActions(actions)

	Update the available actions.

	:param array actions:
		The actions that this thing supports. Each item in the array will be
		converted to :doc:`code </values/code>`.

	Example:

	.. sourcecode:: js

		this.updateActions([
			'button1',
			{ id: 'button2', description: 'Optional description' },
			'button3: Description for button 3'
		]);

.. js:function:: emitAction(action[, data])

	Emit an action with the given identifier. Optionally provide some extra
	data.

	:param string action: The action that should be emitted.
	:param mixed data: The optional data to include with the action event.

	Example:

	.. sourcecode:: js

		this.emitAction('button1');
		this.emitAction('rotated', { amount: 45 });

Implementing capability
------------------------

When implementing this capability ``updateActions`` need to be called with the
available actions. When an action occurrs the method ``emitAction`` needs to
be called.

Example:

.. sourcecode:: js

	const { Thing } = require('abstract-things');
	const { Actions } = require('abstract-things/contollers');

	class Example extends Thing.with(Actions) {
		initCallback() {
			return super.initCallback()
				.then(() => this.updateActions(actionsDetected));
		}
	}
