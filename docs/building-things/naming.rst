Naming of identifiers, types and capabilities
=============================================

Naming is one of the most important aspects when both building and using things.
Libraries that use ``abstract-things`` are expected to follow a few conventions
to simplify use of the things they expose.

Namespaces
----------

Libraries are expected to use a short and understandable namespace. Namespaces
are used for things such as identifiers and to mark things with custom types.

The namespace should be connected to what the library interacts with. This can
be something like ``hue`` for Philips Hue or ``bravia`` for Sony Bravia TVs.

Identifiers
-----------

Every Thing is required to have an identifer. Identifiers should be stable and
globally unique. An identifier needs a prefix, which is usually the namespace
of the library.

For most implementations an identifier will usually be provided with the thing
being interacted with. In those case it can simply be prefixed with the namespace
to create a suitable identifier.

Example of identifiers:

* ``hue:000b57fffe0eee95-01``
* ``miio:55409498``
* ``uuid:8125606b-7b57-405b-94d6-e5720c44aa6a``
* ``space:global``

As a convention things that bridge other networks such as Zigbee or Z-wave
include the keyword ``bridge`` in their identifier, such as
``hue:bridge:000b57fffe0eee95``.

Types
-----

The types defined by ``abstract-things`` try to be short and descriptive.
Libraries may mark things with custom types, but those types are expected to
be namespaced or unique. Those custom types can be used to identify the
specific type of thing.

Example of custom types:

* ``hue:light``
* ``miio:air-purifier``
* ``zwave``

Capabilities
------------

Capabilities follow the same rules as types, see the previous section.
