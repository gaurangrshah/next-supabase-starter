export const is = {
  string(str) {
    return typeof str === 'string' || str instanceof String;
  },
  integer(num) {
    return num === parseInt(num, 10);
  },
  function(fn) {
    return typeof fn === 'function';
  },
  object(obj) {
    return (obj && obj.constructor === Object) || obj === Object(obj);
  },
  empty(value) {
    // returns true when any of the conditions are met --
    // indicating that the value is considered empty

    if (value === null) return true;
    if (value === undefined) return true;
    // is empty string
    if (is.string(value) && value.trim().length === 0) return true;
    // is empty array
    if (Array.isArray(value) && value.length === 0) return true;
    // is empty object
    if (is.object(value) && Object.keys(value).length === 0) return true;
  },
  nan(num) {
    return isNaN(num);
  },
};

export const isBrowser = () => typeof window !== 'undefined';
