module.exports = function(migration) {
  // Create GameContentRating Content Type
  const gameContentRating = migration
    .createContentType('gameContentRating')
    .name('Game Content Rating')
    .description(
      "This stores a link to a Game Content Rating image, and the minimum age required to view the video game's content."
    )
    .displayField('internalName');

  gameContentRating
    .createField('internalName')
    .name('Internal Name')
    .type('Symbol');

  gameContentRating
    .createField('minimumAge')
    .name('Minimum Age')
    .type('Integer');

  gameContentRating
    .createField('ageGate')
    .name('Requires age gate')
    .type('Boolean');

  gameContentRating
    .createField('ratingImage')
    .name('Rating Image')
    .type('Link')
    .linkType('Asset')
    .validations([{ linkMimetypeGroup: ['image'] }]);

  // Deprecate old rating icon fields
  const rating = migration.editContentType('ratings');
  // deprecate ESRB
  rating
    .editField('esrbIcon')
    .disabled(true)
    .name('ESRB Rating (deprecated)');
  rating.moveField('esrbIcon').toTheBottom();
  // deprecate PEGI
  rating
    .editField('pegiIcon')
    .disabled(true)
    .name('PEGI Rating (deprecated)');
  rating.moveField('pegiIcon').toTheBottom();
  // depricate USK
  rating
    .editField('uskIcon')
    .disabled(true)
    .name('USK Rating (Germany) (deprecated)');
  rating.moveField('uskIcon').toTheBottom();
  // depricate CERO
  rating
    .editField('ceroIcon')
    .disabled(true)
    .name('CERO Rating (Japan) (deprecated)');
  rating.moveField('ceroIcon').toTheBottom();
  // depricate GRAC
  rating
    .editField('gracIcon')
    .disabled(true)
    .name('GRAC Rating (Korea) (deprecated)');
  rating.moveField('gracIcon').toTheBottom();
  // depricate RARS
  rating
    .editField('rarsIcon')
    .disabled(true)
    .name('RARS Rating (Russia) (deprecated)');
  rating.moveField('rarsIcon').toTheBottom();
  // depricate OFLC OZ
  rating
    .editField('oflcOzIcon')
    .disabled(true)
    .name('OFLC OZ Rating (Australia) (deprecated)');
  rating.moveField('oflcOzIcon').toTheBottom();
  // depricate OFLCE NZ
  rating
    .editField('oflcNzIcon')
    .disabled(true)
    .name('OFLC NZ Rating (New Zealand) (deprecated)');
  rating.moveField('oflcNzIcon').toTheBottom();
  // depricate DJCTQ
  rating
    .editField('djctqIcon')
    .disabled(true)
    .name('DJCTQ Rating (Brazil) (deprecated)');
  rating.moveField('djctqIcon').toTheBottom();
  // depricate FPB
  rating
    .editField('fpbIcon')
    .disabled(true)
    .name('FPB Rating (South Africa) (deprecated)');
  rating.moveField('fpbIcon').toTheBottom();
  // depricate MDA
  rating
    .editField('mdaIcon')
    .disabled(true)
    .name('MDA Rating (Singapore) (deprecated)');
  rating.moveField('mdaIcon').toTheBottom();

  // Create new rating fields
  // create ESRB GameContentRating
  rating
    .createField('esrbGameContentRating')
    .name('ESRB Game Content Rating')
    .type('Link')
    .linkType('Entry')
    .validations([{ linkContentType: ['gameContentRating'] }]);
  rating.moveField('esrbGameContentRating').beforeField('esrbDescriptors');

  // create PEGI GameContentRating
  rating
    .createField('pegiGameContentRating')
    .name('PEGI Game Content Rating')
    .type('Link')
    .linkType('Entry')
    .validations([{ linkContentType: ['gameContentRating'] }]);
  rating.moveField('pegiGameContentRating').beforeField('pegiImageDescriptors');

  // create USK GameContentRating
  rating
    .createField('uskGameContentRating')
    .name('USK Game Content Rating (Germany)')
    .type('Link')
    .linkType('Entry')
    .validations([{ linkContentType: ['gameContentRating'] }]);
  rating.moveField('uskGameContentRating').afterField('pegiImageDescriptors');

  // create CERO GameContentRating
  rating
    .createField('ceroGameContentRating')
    .name('CERO Game Content Rating (Japan)')
    .type('Link')
    .linkType('Entry')
    .validations([{ linkContentType: ['gameContentRating'] }]);
  rating.moveField('ceroGameContentRating').beforeField('ceroDescriptors');

  // create GRAC GameContentRating
  rating
    .createField('gracGameContentRating')
    .name('GRAC Game Content Rating (Korea)')
    .type('Link')
    .linkType('Entry')
    .validations([{ linkContentType: ['gameContentRating'] }]);
  rating.moveField('gracGameContentRating').beforeField('gracImageDescriptors');

  // create RARS GameContentRating
  rating
    .createField('rarsGameContentRating')
    .name('RARS Game Content Rating (Russia)')
    .type('Link')
    .linkType('Entry')
    .validations([{ linkContentType: ['gameContentRating'] }]);
  rating.moveField('rarsGameContentRating').afterField('gracImageDescriptors');

  // create OFLC OZ GameContentRating
  rating
    .createField('oflcOzGameContentRating')
    .name('OFLC OZ Game Content Rating (Australia)')
    .type('Link')
    .linkType('Entry')
    .validations([{ linkContentType: ['gameContentRating'] }]);
  rating
    .moveField('oflcOzGameContentRating')
    .afterField('rarsGameContentRating');

  // create OFLC NZ GameContentRating
  rating
    .createField('oflcNzGameContentRating')
    .name('OFLC NZ Game Content Rating (New Zealand)')
    .type('Link')
    .linkType('Entry')
    .validations([{ linkContentType: ['gameContentRating'] }]);
  rating
    .moveField('oflcNzGameContentRating')
    .afterField('oflcOzGameContentRating');

  // create DJCTQ GameContentRating
  rating
    .createField('djctqGameContentRating')
    .name('DJCTQ Game Content Rating (Brazil)')
    .type('Link')
    .linkType('Entry')
    .validations([{ linkContentType: ['gameContentRating'] }]);
  rating.moveField('djctqGameContentRating').beforeField('djctqDescriptors');

  // create FPB GameContentRating
  rating
    .createField('fpbGameContentRating')
    .name('FPB Game Content Rating (South Africa)')
    .type('Link')
    .linkType('Entry')
    .validations([{ linkContentType: ['gameContentRating'] }]);
  rating.moveField('fpbGameContentRating').afterField('djctqDescriptors');

  // create MDA GameContentRating
  rating
    .createField('mdaGameContentRating')
    .name('MDA Game Content Rating (Singapore)')
    .type('Link')
    .linkType('Entry')
    .validations([{ linkContentType: ['gameContentRating'] }]);
  rating.moveField('mdaGameContentRating').afterField('fpbGameContentRating');
};
