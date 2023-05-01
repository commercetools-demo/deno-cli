import { sdk } from "./../../deps.ts";

export async function cleaninventory(handle: sdk) {
  const projectKey = handle.projectKey;
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
    .inventory()
    .get()
    .execute();
  const inventorylist = result.body.results;
  if (!inventorylist.length) console.log(`No inventory to delete`);
  inventorylist.map(async (inventory) => {
    console.log(`Deleting inventory ${inventory.key} with ID: ${inventory.id}`);
    await handle
      .apiRoot()
      .withProjectKey({ projectKey })
      .inventory()
      .withId({ ID: inventory.id })
      .delete({ queryArgs: { version: inventory.version } })
      .execute();
  });
}
