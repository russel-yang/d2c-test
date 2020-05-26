import { danger, warn } from 'danger';
import { readFile } from 'fs';

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
  danger.git.created_files
    .concat(danger.git.modified_files)
    .filter(path => path.startsWith('scripts/active/'))
    .map(async path => {
      const file = await (danger.github
        ? danger.github.utils.fileContents(path)
        : new Promise<string>((resolve, reject) =>
            readFile(path, (err, data) =>
              err ? reject(err) : resolve(data.toString())
            )
          ));
      const lines = file.split('\n');
      lines.forEach((line, lineNumber) => {
        if (dangerousChanges.some(i => line.includes(i))) {
          console.log(path, lineNumber);
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
