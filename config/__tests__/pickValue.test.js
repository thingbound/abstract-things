'use strict';

const pickValue = require('../pickValue');

describe('Configuration', () => {
	describe('pickValue', () => {

		test('Pick key', () => {
			const v = {
				abc: 'def'
			};

			const p = pickValue(v, 'abc');
			expect(p).toEqual('def');
		});

		test('Pick array value', () => {
			const v = [ 'def' ];

			const p = pickValue(v, '[0]');
			expect(p).toEqual('def');
		});

		test('Pick deeper key', () => {
			const v = {
				abc: {
					def: 'ghi'
				}
			};

			const p = pickValue(v, 'abc.def');
			expect(p).toEqual('ghi');
		});

		test('Pick deeper array value', () => {
			const v = {
				abc: [ 'def' ]
			};

			const p = pickValue(v, 'abc[0]');
			expect(p).toEqual('def');
		});

		test('Pick value in array object', () => {
			const v = {
				abc: [ { def: 'ghi' } ]
			};

			const p = pickValue(v, 'abc[0].def');
			expect(p).toEqual('ghi');
		});
	});
});
