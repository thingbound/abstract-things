Building things
===================

Things are built by extending ``Thing`` with a combination of types and
capabilities. The first step is to make sure that the project has acccess to
``abstract-things``:

.. sourcecode:: shell

	$ npm install abstract-things

It is recommended to target at least Node 8 to make use of ``async`` and
``await``. It will make handling the asynchronous nature of API calls easier.

The smallest possible thing simply extends ``Thing``:

.. sourcecode:: js

	const { Thing } = require('abstract-things');

	class ExampleThing extends Thing {
		constructor(id) {
			super();

			// Identifier is required to be set
			this.id = 'example:' + id;
		}
	}

The following example provides a class named ``Timer`` that declares its type
and available API. It will emit the ``timer`` event when an added timer is
fired.

.. sourcecode:: js

	const { Thing } = require('abstract-things');
	const { duration } = require('abstract-things/values');

	/**
	* Timer that calls itself `timer:global` and that allows timers to be set
	* and listened for in the network.
	*/
	class Timer extends Thing {
		static get type() {
			return 'timer';
		}

		static availableAPI(builder) {
			builder.event('timer')
				.description('A timer has been fired')
				.type('string')
				.done();

			builder.action('addTimer')
				.description('Add a timer to be fired')
				.argument('string', false, 'Name of timer')
				.argument('duration', false, 'Amount of time to delay the firing of the timer')
				.done();
		}

		constructor() {
			super();

			this.id = 'timer:global';
		}

		addTimer(name, delay) {
			if(! name) throw new Error('Timer needs a name');
			if(! delay) throw new Error('Timer needs a delay');

			delay = duration(delay);

			setTimeout(() => {
				this.emitEvent('timer', name);
			}, delay.ms)
		}
	}

.. toctree::
	:maxdepth: 1
	:caption: Topics

	naming
	metadata
	mixins
	events

