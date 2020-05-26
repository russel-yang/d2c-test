// deletes environment
import { Environment } from 'contentful-management/typings/environment';
import dotenvLoad from 'dotenv-load';
import { getEnvironmentId, getSpace } from '../utils';

dotenvLoad();

(async function main() {
  const id = getEnvironmentId();
  console.log(`Deleting environment ${id}...`);
  const space = await getSpace();
  let environment;
  try {
    environment = await space.getEnvironment(id);
  } catch (err) {
    if (JSON.parse(err.message).status === 404) {
      console.log(`Could not find environment ${id}`);
      return;
    }
  }
  await (environment as Environment).delete();
  console.log(`Environment ${id} deleted`);
})().catch(err => {
  console.error(err);
  process.exit(1);
});
