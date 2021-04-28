import { is } from './validator';

export function remove(fn, obj) {
  // @SCOPE:  a small utility wrapper around iterating over and filtering properties off of an object based on a given filter function
  if (!is.object(obj)) return obj;
  return Object.fromEntries(Object.entries(obj).filter(fn));
}

export function removeKeysRecurr(obj, keys) {
  // @link https://gist.github.com/aurbano/383e691368780e7f5c98#gistcomment-3560352
  /**
   * @SCOPE:  remove keys from a list off of an object or array of objects recursively
   *
   */
  return obj !== Object(obj)
    ? obj
    : Array.isArray(obj)
    ? obj.map((item) => removeKeysRecurr(item, keys))
    : remove(([k]) => !keys.includes(k), obj);
}

export function removeMethods(obj) {
  /**
   * @SCOPE:  remove any functions on an object
   */
  if (!is.object(obj)) return obj;
  return remove(([key]) => !is.function(obj[key]) && { [key]: obj[key] }, obj);
}

export function removeEmpties(obj) {
  // @SCOPE:  remove any empty fields from an object (top level)
  return remove(
    // retro: negated isEmpty because we want to return all non-empty properties
    ([k, val]) => {
      return !is.object(val) && !is.empty(val) && { [k]: val };
    },
    obj
  );
}

export function removeRecurr(fn, obj) {
  // @SCOPE:  runs a function against every key in an object or array of objects
  return obj !== Object(obj)
    ? obj
    : Array.isArray(obj)
    ? obj.map((item) => removeRecurr(fn, item))
    : remove(fn, obj);
}

export function flattenObjects(arr) {
  return arr.reduce((obj, item) => ((obj[item.key] = item.value), obj), {});
}
