'use strict';

const parsePath = require('../parsePath');
const { randomizedTest } = require('dumbfound-jest');

describe('Configuration', () => {
	describe('parsePath', () => {

		test('Single segment', () => {
			const p = parsePath('key');

			expect(p).toEqual([ 'key' ]);
		});

		test('Multiple segments', () => {
			const p = parsePath('one.two');

			expect(p).toEqual([ 'one', 'two' ]);
		});

		randomizedTest('Single key, random', random => {
			const v = random.asciiAlphaNumeric();
			const p = parsePath(v);

			expect(p).toEqual([ v ]);
		});

		test('Single array selector', () => {
			const p = parsePath('[0]');

			expect(p).toEqual([ 0 ]);
		});

		test('Multiple array selectors', () => {
			const p = parsePath('[0][1245]');

			expect(p).toEqual([ 0, 1245 ]);
		});

		test('Segment, array selector', () => {
			const p = parsePath('abc[0]');

			expect(p).toEqual([ 'abc', 0 ]);
		});

		test('Segment, array selector, segment', () => {
			const p = parsePath('abc[0].def');

			expect(p).toEqual([ 'abc', 0, 'def' ]);
		});

		test('Array selector after dot', () => {
			const p = parsePath('abc.[0].def');

			expect(p).toEqual([ 'abc', 0, 'def' ]);
		});
	});
});
