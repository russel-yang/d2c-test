import { MigrationFunction } from 'contentful-migration';

const migrate: MigrationFunction = migration => {
  const dog = migration.createContentType('dog').name('Dog');
  dog
    .createField('name')
    .type('Symbol')
    .name('Name')
    .required(true)
    .disabled(true);
  dog.editField('name', {
    type: 'Symbol',
    omitted: true
  });
  migration.deleteContentType('dog');
};

module.exports = migrate;
