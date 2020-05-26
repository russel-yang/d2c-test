import { danger, warn } from 'danger';

const dangerousChanges = [
  '.deleteContentType(',
  '.transformEntries(',
  '.deriveLinkedEntries(',
  '.transformEntriesToType(',
  '.makeRequest(',
  '.deleteField(',
  '.changeFieldId(',
  '.omitted(true)',
  '.disabled(true)',
  '.deleted(true)',
  'disabled: true',
  'omitted: true',
  'deleted: true'
];

Promise.all(
    const file = await danger.github.utils.fileContents(path);
    const lines = file.split('\n');
    lines.forEach((line, lineNumber) => {
      if (dangerousChanges.some(i => line.includes(i))) {
        warn(
          'Risky migration: make sure this is reviewed by QA before merging',
          path,
          lineNumber
        );
      }
    });
  })
  danger.git.created_files
    .concat(danger.git.modified_files)
    .filter(path => path.startsWith('scripts/active/'))
    .map(async path => {
).catch(err => {
  console.error(err);
  process.exit(1);
});
