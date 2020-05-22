module.exports = function(migration) {
  // add background video field to key features
  const keyFeature = migration.editContentType('keyFeature');

  keyFeature
    .createField('backgroundVideo')
    .name('Background Video')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ['video']
      }
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  keyFeature.changeFieldControl(
    'backgroundVideo',
    'builtin',
    'assetLinkEditor',
    {}
  );
};
