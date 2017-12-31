abstract-things
======================================

`abstract-things` is a JavaScript library that provides a simple base for
building libraries that interact with physical things, such as IoT-devices, and virtual things.

This library provides a base class named `Thing` that supports mixins of
various types. Things are described using two types of tags, one describing
the type of the thing and one describing its capabilities. Things are also
expected to describe their public API, to make remote use easier.

Types and capabilities are designed to be stable and to be combined. When
combined they describe a thing and what it can do.

.. note::

	This documentation is a work in progress. Things are missing and may
	sometimes be inaccurate. Please open issues on `Github
	<https://github.com/tinkerhub/abstract-things>`_ if you find something
	that seems wrong.

.. toctree::
	:maxdepth: 2
	:caption: Getting started

	using-things
	building-things/index
	values/index

.. toctree::
	:maxdepth: 2
	:caption: Types and capabilities

	common/index
	lights/index
	sensors/index
	climate/index
