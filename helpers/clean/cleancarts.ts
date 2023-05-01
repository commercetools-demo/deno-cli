import { sdk } from "./../../deps.ts";

export async function cleancarts(handle: sdk) {
  const projectKey = handle.projectKey;
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
    .carts()
    .get()
    .execute();
  const cartslist = result.body.results;
  if (!cartslist.length) console.log(`No carts to delete`);
  cartslist.map(async (carts) => {
    console.log(`Deleting carts ${carts.key} with ID: ${carts.id}`);
    await handle
      .apiRoot()
      .withProjectKey({ projectKey })
      .carts()
      .withId({ ID: carts.id })
      .delete({ queryArgs: { version: carts.version } })
      .execute();
  });
}
