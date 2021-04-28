export function pluck(arr, keys) {
  if (!Array.isArray(arr) || !Array.isArray(keys)) {
    return console.error("please provie an arrao");
  }
  return keys.map((key) =>
    arr.map((item) => (item[key] ? { [key]: item[key] } : {}))
  );
}

export function flatten(arr) {
  return arr.reduce((total, currentValue) => total.concat(currentValue), []);
}

export function limit(arr, c) {
  return arr.filter((x, i) => {
    if (i <= c - 1) {
      return true;
    }
  });
}

export function arrayFill(length, val) {
  return new Array(length).fill(val);
}

export function uniqueData(data = []) {
  return [
    ...data.reduce((map, obj) => map.set(obj.id, obj), new Map()).values(),
  ];
}

export function groupBy(objArr, property) {
  return objArr.reduce(function (total, obj) {
    let key = obj[property];
    if (!total[key]) {
      total[key] = [];
    }
    total[key].push(obj);
    return total;
  }, {});
}

export function sortBy(arrToSort = [], values = ["id", "title"]) {
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
