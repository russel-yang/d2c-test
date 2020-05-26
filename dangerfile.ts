import { danger, warn } from 'danger';
import { readFileSync } from 'fs';

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

danger.git.created_files.concat(danger.git.modified_files).forEach(path => {
  const file = readFileSync(path).toString();
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
});
