// clones master to temporary environment,
// applies active migration,
// waits for user input (allowing temp environment to be tested),
// then deletes temporary environment
import * as contentful from 'contentful-management';
import { Space } from 'contentful-management/typings/space';
import { runMigration } from 'contentful-migration';
import dotenvLoad from 'dotenv-load';
import * as path from 'path';
import * as readline from 'readline';

dotenvLoad();

function waitForInput(query: string) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve =>
    rl.question(query, ans => {
      rl.close();
      resolve(ans);
    })
  );
}

async function environmentReady(space: Space, environmentId: string) {
  const DELAY = 3000;
  const MAX_NUMBER_OF_TRIES = 10;
  let count = 0;

  // using await in loop intentionally since it's a polling loop
  /* eslint-disable no-await-in-loop */
  while (count < MAX_NUMBER_OF_TRIES) {
    const env = await space.getEnvironment(environmentId);
    const status = env.sys.status && env.sys.status.sys.id;
    if (status === 'ready') {
      return;
    }
    if (status === 'failed') {
      break;
    }
    await new Promise(r => setTimeout(r, DELAY));
    count += 1;
  }
  /* eslint-enable no-await-in-loop */
  throw new Error('Environment creation failed');
}

const source = 'master';

(async function main() {
  const accessToken = process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN;
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  if (!accessToken) {
    throw new Error('No access token defined');
  }
  if (!spaceId) {
    throw new Error('No space defined');
  }
  console.log('Running test migration...');
  const client = contentful.createClient({
    accessToken
  });

  const space = await client.getSpace(spaceId);
  const testId = `migration-test-${Date.now()}`;
  console.log(`Creating temporary environment ${testId}...`);
  const environment = await space.createEnvironmentWithId(
    testId,
    {
      name: testId
    },
    source
  );
  console.log(`Temporary environment ${testId} created`);

  try {
    console.log('Waiting for processing...');
    await environmentReady(space, environment.sys.id);
    console.log('Processing complete');

    console.log('Applying active migration...');
    await runMigration({
      filePath: path.resolve(__dirname, './active'),
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
      environmentId: testId,
      // this option isn't included in their type definition for some reason
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      yes: true
    });
    console.log('Active migration applied');
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
