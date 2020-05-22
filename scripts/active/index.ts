import { MigrationFunction } from 'contentful-migration';

const migrations = [
  'deprecate-key-feature-slug',
  'key-feature-backgroundVideo',
  'app-id-extension',
  'add-platforms-validation',
  'delete-sandbox',
  'add-cta-message',
  'onpageseo-ogimage'
  // note: add all new migrations to the bottom of the list
  // eslint-disable-next-line global-require, import/no-dynamic-require
].map(script => require(`./${script}`));

const migrate: MigrationFunction = (...params) => {
  migrations.forEach(m => m(...params));
};

module.exports = migrate;
