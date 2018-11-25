'use strict';

const { mixed } = require('../../values');
const Thing = require('../../thing');

const RootGroup = require('../root-group');
const Group = require('../group');
const Property = require('../property');

describe('Configuration', () => {
	describe('Group and Property hierarchy', () => {

		test('Property on root settable and gettable', () => {
			const root = new RootGroup(new Thing());
			const property = new Property(root, 'test', {
				type: mixed
			});

			property.update('test');
			const current = property.get();

			expect(current).toBe('test');
		});

		test('Property on sub group findable', () => {
			const root = new RootGroup(new Thing());
			const group = new Group(root, 'group');
			const property = new Property(group, 'test', {
				type: mixed
			});

			const foundProperty = root.get('group.test');
			expect(foundProperty).toBe(property);
		});

		test('Property on sub group settable and gettable', () => {
			const root = new RootGroup(new Thing());
			const group = new Group(root, 'group');
			const property = new Property(group, 'test', {
				type: mixed
			});

			property.update('test');
			const current = property.get();

			expect(current).toBe('test');
		});

	});
});
