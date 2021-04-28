export function isValidJson(string) {
  /**
   * @SCOPE:  uses json.parse to validate a string as json
   * used by:
   * - show-json
   *
   */
  if (typeof string !== 'string') return false;
  try {
    JSON.parse(string);
    return true;
  } catch (error) {
    return false;
  }
}

export function jsonCompare(val1, val2) {
  // unused
  let compare1, compare2;
  const values = [val1, val2];

  const comparators = values.map((val) =>
    isValidJson(val) ? val : JSON.stringify(val)
  );

  return comparators[0] === comparators[1];
}
