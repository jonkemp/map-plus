/* global map */
const { assert } = chai;

mocha.setup('bdd');
mocha.checkLeaks();

const noop = () => {};
const initial = (array, n, guard) => Array.prototype.slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
const first = (array, n, guard) => {
	if (array == null || array.length < 1) return n == null ? void 0 : [];
	if (n == null || guard) return array[0];

	return initial(array, array.length - n);
};

describe('map', () => {
	it('should produce a new array of values by mapping each value in list through an iteratee', () => {
		assert.deepEqual(map([1, 2, 3], num => num * 3), [3, 6, 9]);
		assert.deepEqual(map({one: 1, two: 2, three: 3}, num => num * 3), [3, 6, 9]);
		assert.deepEqual(map([[1, 2], [3, 4]], first), [1, 3]);
	});

	it('should return doubled numbers', () => {
		const doubled = map([1, 2, 3], num => num * 2);

		assert.deepEqual(doubled, [2, 4, 6]);
	});

	it('should return tripled numbers with context', () => {
		const tripled = map([1, 2, 3], function(num){ return num * this.multiplier; }, {multiplier: 3});

		assert.deepEqual(tripled, [3, 6, 9]);
	});

	it('can use collection methods on Array-likes', () => {
		const ids = map({length: 2, 0: {id: '1'}, 1: {id: '2'}}, ({id}) => id);

		assert.deepEqual(ids, ['1', '2']);
	});

	it('should handle a null properly', () => {
		assert.deepEqual(map(null, noop), []);
	});

	it('should call with proper context', () => {
		assert.deepEqual(map([1], function() {
			return this.length;
		}, [5]), [1]);
	});

	it('should map predicate string to object properties', () => {
		// Passing a property name like _.pluck.
		const people = [{name: 'moe', age: 30}, {name: 'curly', age: 50}];

		assert.deepEqual(map(people, 'name'), ['moe', 'curly']);
	});
});
