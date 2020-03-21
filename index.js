const { cb, isArrayLike, getKeys } = require('./lib/index');

module.exports = (obj, iteratee, context) => {
	iteratee = cb(iteratee, context);
	const keys = !isArrayLike(obj) && getKeys(obj);
	const {length} = keys || obj;
	const results = Array(length);

	for (let index = 0; index < length; index++) {
		const currentKey = keys ? keys[index] : index;

		results[index] = iteratee(obj[currentKey], currentKey, obj);
	}

	return results;
};
