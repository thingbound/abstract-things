'use strict';

const findGroup = require('../findGroup');
const Group = require('../group');

describe('Configuration', () => {
	describe('findGroup', () => {

		test('Root findable', () => {
			const root = new Group();
			const found = findGroup(root, 'property');

			expect(found).toBe(root);
		});

		test('Existing root key findable', () => {
			const root = new Group();
			const sub = new Group('sub');
			root.add(sub);

			const found = findGroup(root, 'sub.property');

			expect(found).toBe(sub);
		});

		test('Non-existant root key not findable', () => {
			const root = new Group();
			const found = findGroup(root, 'non-existant.property');

			expect(found).toBe(undefined);
		});

		test('Deeper property findable', () => {
			const root = new Group();
			const sub1 = new Group('one');
			root.add(sub1);

			const sub2 = new Group('two');
			sub1.add(sub2);

			const found = findGroup(root, 'one.two.property');

			expect(found).toBe(sub2);
		});
	});
});
