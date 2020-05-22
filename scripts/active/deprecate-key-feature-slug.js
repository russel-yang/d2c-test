module.exports = function(migration) {
  // deprecate key feature slug (missed in previous migration)
  const keyFeature = migration.editContentType(
    'productDetailPageKeyFeatureContainer'
  );

  keyFeature
    .editField('slug')
    .name('slug (deprecated)')
    .disabled(true);
  keyFeature.moveField('slug').toTheBottom();
};
