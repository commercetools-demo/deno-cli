import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function cleanstores(handle: sdk) {
  const result = await handle
    .root()
    .stores()
    .get()
    .execute();
  const storeslist = result.body.results;
  if (!storeslist.length) console.log(`No stores to delete`);
  for (const store of storeslist) {
    console.log(`Deleting store ${store.key} with ID: ${store.id}`);
    await handle
      .root()
      .stores()
      .withKey({ key: store.key })
      .delete({ queryArgs: { version: store.version } })
      .execute();
  }
}
