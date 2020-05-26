import * as contentful from 'contentful-management';
import { Space } from 'contentful-management/typings/space';
import { runMigration } from 'contentful-migration';
import * as path from 'path';
import * as readline from 'readline';

export function getEnvironmentId() {
  const id = process.env.ENVIRONMENT_ID;
  if (!id) {
    throw new Error('No environment id defined');
  }
  return `ci-${id}`;
}

export const getClient = (() => {
  let client: contentful.ClientAPI;
  return () => {
    if (client) {
      return client;
    }
    const accessToken = process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN;
    if (!accessToken) {
      throw new Error('No access token defined');
    }
    client = contentful.createClient({
      accessToken
    });
    return client;
  };
})();

export const getSpace = (() => {
  let space: Space;
  return async () => {
    if (space) {
      return space;
    }
    const client = getClient();
    const spaceId = process.env.CONTENTFUL_SPACE_ID;
    if (!spaceId) {
      throw new Error('No space defined');
    }
    space = await client.getSpace(spaceId);
    return space;
  };
})();

/**
 * Waits for user command-line input
 *
 * @param query Prompt to show to user
 * @returns String that user typed
 */
export function waitForInput(query: string): Promise<string> {
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

/**
 * Clones an environment to a new one
 *
 * Remember to `await environmentReady(targetId)` before trying to use the new environment
 */
export async function cloneEnvironment(sourceId: string, targetId: string) {
  console.log(`Cloning ${sourceId} to ${targetId}...`);
  const space = await getSpace();
  const environment = await space.createEnvironmentWithId(
    targetId,
    {
      name: targetId
    },
    sourceId
  );
  console.log(`${sourceId} cloned to ${targetId}`);
  return environment;
}

/** Waits for setup of new environment to complete */
export async function environmentReady(environmentId: string) {
  console.log('Waiting for processing...');
  const space = await getSpace();
  const DELAY = 3000;
  const MAX_NUMBER_OF_TRIES = 10;
  let count = 0;

  // using await in loop intentionally since it's a polling loop
  /* eslint-disable no-await-in-loop */
  while (count < MAX_NUMBER_OF_TRIES) {
    const env = await space.getEnvironment(environmentId);
    const status = env.sys.status && env.sys.status.sys.id;
    if (status === 'ready') {
      console.log('Processing complete');
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

/** Applies all active migrations */
export async function applyMigrations(environmentId: string) {
  console.log('Applying active migration...');
  await runMigration({
    filePath: path.resolve(__dirname, './active'),
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
    environmentId,
    yes: true
  });
  console.log('Active migration applied');
}
