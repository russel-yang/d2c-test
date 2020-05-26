// clones master to environment and applies active migrations
import dotenvLoad from 'dotenv-load';
import {
  applyMigrations,
  cloneEnvironment,
  environmentReady,
  getEnvironmentId
} from '../utils';

dotenvLoad();

(async function main() {
  const id = getEnvironmentId();
  console.log(`Preparing environment ${id}`);
  const environment = await cloneEnvironment('master', id);
  await environmentReady(environment.sys.id);
  await applyMigrations(id);
  console.log('Environment prepared');
  console.log(
    `Visit https://app.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${id}/content_types to review changes`
  );
})().catch(err => {
  console.error(err);
  process.exit(1);
});
