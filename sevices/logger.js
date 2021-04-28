//@link: https://simplernerd.com/js-console-colors/

const logger = {
  settings: {
    debug: process.env.NODE_ENV === "development" && true,
    auth: true,
    footer: "%c--------------------------------------------------------",
  },

  styles: {
    base: [
      "color: #fff",
      "background-color: #777",
      "padding: 2px 4px",
      "border-radius: 2px",
    ].join(";"),
    success: ["background-color: palegreen"].join(";"),
    error: ["color: #eee", "background-color: red"].join(";"),
    auth: ["color: blue", "background-color: lightyellow"].join(";"),
    info: ["color: #555", "background-color: linen"].join(";"),
  },
};

logger.log = (msg, ...args) => {
  if (!logger.settings.debug) return;
  const style = logger.styles.base + ";";
  console.log(`%c${msg}`, style);
  if (args) console.log(...args);
  console.log(logger.settings.footer, style);
  return;
};
logger.success = (msg, ...args) => {
  if (!logger.settings.debug) return;
  const style = (logger.styles.base += logger.styles.success + ";");
  console.log(`%cSUCCESS: ${msg}`, style);
  if (args) console.log(...args);
  console.log(logger.settings.footer, style);
  return;
};
logger.error = (msg, ...args) => {
  if (!logger.settings.debug) return;
  const style = (logger.styles.base += logger.styles.error + ";");
  console.log(`%cERROR: ${msg}`, style);
  if (args) console.log(...args);
  console.log(logger.settings.footer, style);
  return;
};
logger.auth = (msg, ...args) => {
  if (!logger.settings.debug || !logger.settings.auth) return;
  const style = (logger.styles.base += logger.styles.auth + ";");
  console.log(`%c🔐${msg}`, style);
  if (args) console.log(...args);
  console.log(logger.settings.footer, style);
  return;
};
logger.info = (msg, ...args) => {
  if (!logger.settings.debug) return; // @NOTE: only log if global settings is allowing it
  const style = (logger.styles.base += logger.styles.info + ";");
  console.log(`%cINFO: ${msg}`, style);
  if (args) console.log(...args);
  console.log(logger.settings.footer, style);
  return;
};

module.exports = { logger };
