import { sdk } from "./../../deps.ts";

export async function cleanstores(handle: sdk) {
  const projectKey = handle.projectKey;
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
    .stores()
    .get()
    .execute();
  const storeslist = result.body.results;
  if (!storeslist.length) console.log(`No stores to delete`);
  storeslist.map(async (store) => {
    console.log(`Deleting store ${store.key} with ID: ${store.id}`);
    await handle
      .apiRoot()
      .withProjectKey({ projectKey })
      .stores()
      .withKey({ key: store.key })
      .delete({ queryArgs: { version: store.version } })
      .execute();
  });
}
