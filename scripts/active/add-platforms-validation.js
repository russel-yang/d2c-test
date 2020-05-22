module.exports = function(migration) {
  // removes switch, and updates with nintendo switch also updates existing entries
  const layout = migration.editContentType('layout');

  layout.editField('platforms').items({
    type: 'Symbol',

    validations: [
      {
        in: [
          'Steam',
          'DRM Free',
          'PlayStation',
          'Xbox',
          'Nintendo Switch',
          'Epic',
          'Stadia',
          'Other'
        ]
      }
    ]
  });

  layout.changeFieldControl('platforms', 'builtin', 'checkbox', {});

  migration.transformEntries({
    contentType: 'layout',
    shouldPublish: 'preserve',
    from: ['platforms'],
    to: ['platforms'],
    transformEntryForLocale: async (fromFields, locale) => {
      const selectedPlatforms =
        (fromFields.platforms && fromFields.platforms[locale]) || [];
      if (selectedPlatforms) {
        return {
          platforms: selectedPlatforms.map(platform =>
            platform === 'Switch' ? 'Nintendo Switch' : platform
          )
        };
      }
    }
  });
};
