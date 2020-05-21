# Contentful migration

Example migration script:

```ts
import { MigrationFunction } from 'contentful-migration';

const migrate: MigrationFunction = migration => {
  const dog = migration.createContentType('dog').name('Dog');
  dog
    .createField('name')
    .type('Symbol')
    .name('Name')
    .required(true);
};

module.exports = migrate;
```

## Resources

- [Scripting Migrations](https://www.contentful.com/developers/docs/tutorials/cli/scripting-migrations/)
