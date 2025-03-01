const isObject = (obj) => {
	const type = typeof obj;

	return type === 'function' || (type === 'object' && !!obj);
};

const getKeys = (obj) => {
	if (!isObject(obj)) return [];

	return Object.keys(obj);
};

const shallowProperty = (key) => (obj) =>
	obj == null ? undefined : obj[key];

const getLength = shallowProperty('length');

const isArrayLike = (collection) => {
	const length = getLength(collection);

	return typeof length === 'number' &&
		   length >= 0 &&
		   length <= Number.MAX_SAFE_INTEGER;
};

const identity = (value) => value;

const isFunction = (obj) =>
	Object.prototype.toString.call(obj) === '[object Function]';

const optimizeCb = (func, context, argCount) => {
	if (context === undefined) return func;

	switch (argCount == null ? 3 : argCount) {
	  case 1:
			return (value) => func.call(context, value);
			// The 2-argument case is omitted because we’re not using it.
	  case 3:
			return (value, index, collection) =>
		  func.call(context, value, index, collection);
	  case 4:
			return (accumulator, value, index, collection) =>
		  func.call(context, accumulator, value, index, collection);
	  default:
			return (...args) => func.apply(context, args);
	}
};

const isMatch = (object, attrs) => {
	const keys = getKeys(attrs);
	const { length } = keys;

	if (object == null) return !length;

	const obj = Object(object);

	for (let i = 0; i < length; i++) {
	  const key = keys[i];

	  if (attrs[key] !== obj[key] || !(key in obj)) return false;
	}

	return true;
};

const matcher = (attrs) => {
	attrs = { ...attrs };

	return (obj) => isMatch(obj, attrs);
};

const deepGet = (obj, path) => {
	const { length } = path;

	for (let i = 0; i < length; i++) {
	  if (obj == null) return undefined;
	  obj = obj[path[i]];
	}

	return length ? obj : undefined;
};

const property = (path) => {
	if (!Array.isArray(path)) {
	  return shallowProperty(path);
	}

	return (obj) => deepGet(obj, path);
};

const baseIteratee = (value, context, argCount) => {
	if (value == null) return identity;
	if (isFunction(value)) return optimizeCb(value, context, argCount);
	if (isObject(value) && !Array.isArray(value)) return matcher(value);

	return property(value);
};

let iteratee;
const exportIteratee = (iteratee = (value, context) =>
	baseIteratee(value, context, Infinity)
);

const cb = (value, context, argCount) => {
	if (iteratee !== exportIteratee) return iteratee(value, context);

	return baseIteratee(value, context, argCount);
};

const map = (obj, iteratee, context) => {
	iteratee = cb(iteratee, context);
	const keys = !isArrayLike(obj) && getKeys(obj);
	const { length } = keys || obj;
	const results = new Array(length);

	for (let index = 0; index < length; index++) {
	  const currentKey = keys ? keys[index] : index;

	  results[index] = iteratee(obj[currentKey], currentKey, obj);
	}

	return results;
};

module.exports = map;
