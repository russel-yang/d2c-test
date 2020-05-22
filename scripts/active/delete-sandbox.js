module.exports = function(migration) {
  // remove unused sandbox content type
  migration.deleteContentType('sandbox');
};
