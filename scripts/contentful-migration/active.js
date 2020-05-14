module.exports = function(...params) {
  [
    // note: add all new migrations to the bottom of the list
  ].map(script => require(`./${script}`)(...params));
};
