// clones master to temporary environment,
// applies active migration,
// waits for user input (allowing temp environment to be tested),
// then deletes temporary environment
import dotenvLoad from 'dotenv-load';
import {
  applyMigrations,
  cloneEnvironment,
  environmentReady,
  waitForInput
} from './utils';

dotenvLoad();

(async function main() {
  console.log('Running test migration...');
  const testId = `migration-test-${Date.now()}`;
  const environment = await cloneEnvironment('master', testId);
  try {
    await environmentReady(environment.sys.id);
    await applyMigrations(testId);
    console.log(
      `Visit https://app.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${testId}/content_types to review changes`
    );
    await waitForInput('Press enter to delete temporary environment');
  } finally {
    console.log('Deleting temporary environment...');
    await environment.delete();
    console.log('Temporary environment deleted');
  }

  console.log('Migration test completed');
})().catch(err => console.error('Migration test failed:\n', err));
