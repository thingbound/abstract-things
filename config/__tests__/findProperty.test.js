'use strict';

const findProperty = require('../findProperty');
const Group = require('../group');
const Property = require('../property');

describe('Configuration', () => {
	describe('findGroup', () => {

		test('Non-existant not found', () => {
			const root = new Group();
			const found = findProperty(root, 'property');

			expect(found).toBe(undefined);
		});

		test('Findable on root', () => {
			const root = new Group();
			const property = new Property(null, null, 'property', {});
			root.add(property);

			const found = findProperty(root, 'property');
			expect(found).toBe(property);
		});

		test('Findable in sub-group', () => {
			const root = new Group();

			const sub = new Group('sub');
			root.add(sub);

			const property = new Property(null, null, 'property', {});
			sub.add(property);

			const found = findProperty(root, 'sub.property');
			expect(found).toBe(property);
		});

	});
});
