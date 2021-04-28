export function extractUserNameFromEmail(email = '') {
  // used by email.js
  return removeSpecialCharacters(email?.split('@')[0]);
}

export function shortid() {
  /**
   * @SCOPE: helper fn only meant for quick prototyping
   * ❌ remove any instances in production
   */
  //http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function truncateFileName(str, length = 8) {
  const ext = str.substring(str.lastIndexOf('.') + 1, str.length).toLowerCase();
  let newString = str.replace('.' + ext, '');

  if (str.length <= length) return str;
  newString =
    newString.substring(0, length) + (str.length > length ? '[...]' : '');
  return newString + '.' + ext;
}

export function truncate(str, length = 8) {
  if (str.length <= length) return str;
  return str.substring(0, length) + (str.length > length ? '...' : '');
}

export function unPluralize(str = '') {
  // @SCOPE:  if a string ends in a 's' we simple remove the 's'
  if (!str) return;
  str = str?.toLowerCase();
  if (str[str?.length - 1] === 's') str = str?.substring(0, str?.length - 1);
  return str;
}

export function capitalizeFirstWord(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeEveryWord(str = '') {
  // @link: https://tinyurl.com/yde3emms
  return str.map(capitalizeString).join();
}

export function removeSpecialCharacters(str = '') {
  return str.replace(/[^a-zA-Z ]/g, '');
}

export const toDateTime = (secs) => {
  var t = new Date('1970-01-01T00:30:00Z'); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};

export function promiseTimeout(cb) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 2000);
  }).then(() => cb());
  // USAGE: async () => await promiseTimeout(() => logger.log("create page"))
}
