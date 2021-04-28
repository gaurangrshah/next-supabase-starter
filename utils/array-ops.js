export function limit(arr, length) {
  // @SCOPE:  limit the number of items in an array
  return arr.filter((x, i) => {
    if (i <= length - 1) {
      return true;
    }
  });
}

export function arrayFill(length, val) {
  // @SCOPE:  fill an array with any amount of the same values
  return new Array(length).fill(val);
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
export function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function uniqueData(data = []) {
  // @SCOPE:  takes an array and removes all duplicate entries (shallow)

  return [
    ...data.reduce((map, obj) => map.set(obj.id, obj), new Map()).values(),
  ];
}

export function sortBy(arrToSort = [], values = ['id', 'title']) {
  let sorted;

  if (Array.isArray(values)) {
    arrToSort.sort(
      (a, b) =>
        a[values[0]] > b[values[0]] // compare each value individually
          ? 1 // return if true
          : (a[values[0]] === b[values[0]] // check if equal
              ? a[values[1]] > b[values[1]] // secondary sorting if equal
                ? 1 // return if secondary true
                : -1 // return if secondary false
              : -1) - 1 // return if
    );
  }

  sorted = arrToSort.sort((a, b) => (a[values[0]] > b[values[0]] ? 1 : -1));

  return sorted;
}

/**
  USAGE:
  sortBy(data = [], ['id', 'title'])
  takes in an array and upto two values to use to sort the array by
  TODO: refactor the comparison into its own function that we can then just call for each item inthe values array -- rather than only allowing up to two items in the array
 */
