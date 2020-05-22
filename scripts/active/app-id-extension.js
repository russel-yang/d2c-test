module.exports = function(migration) {
  function useAppIdExtension(typeName) {
    const type = migration.editContentType(typeName);
    type.changeFieldControl(
      'applicationId',
      'extension',
      '3kWf5Ima85ha0F7DqILNyf',
      {}
    );
  }

  [
    'applicationConfiguration',
    'productDetailPage',
    'standalonePage',
    'storePage',
    'errorPage'
  ].map(useAppIdExtension);
};
