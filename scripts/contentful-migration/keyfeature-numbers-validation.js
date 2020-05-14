module.exports = function(migration) {
  const productDetailPageKeyFeatureContainer = migration.editContentType(
    'productDetailPageKeyFeatureContainer'
  );

  productDetailPageKeyFeatureContainer.editField('keyfeatures').validations([
    {
      size: {
        max: 10
      }
    }
  ]);
};
