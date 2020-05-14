module.exports = function(...params) {
  [
    'keyfeature-numbers-validation',
    'create-game-content-rating',
    'autogenerate-slugs'
    // note: add all new migrations to the bottom of the list
  ].map(script => require(`./${script}`)(...params));
};
