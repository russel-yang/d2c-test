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
  danger.git.created_files.concat(danger.git.modified_files).map(async path => {
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
).catch(err => {
  console.error(err);
  process.exit(1);
});
