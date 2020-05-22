module.exports = function(migration) {
  const onPageSeo = migration.editContentType('onPageSeo');
  onPageSeo
    .createField('ogImage')
    .name('ogImage')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ['image']
      }
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');
  onPageSeo.changeFieldControl('ogImage', 'builtin', 'assetLinkEditor', {
    helpText:
      'Card image when site url shared on social media (facebook, twitter, linked, slack, discord)'
  });
  onPageSeo.moveField('ogImage').afterField('description');
};
