import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function cleaninventory(handle: sdk) {
  const result = await handle
    .root()
    .inventory()
    .get()
    .execute();
  const inventorylist = result.body.results;
  if (!inventorylist.length) console.log(`No inventory to delete`);
  for (const inventory of inventorylist) {
    console.log(`Deleting inventory ${inventory.key} with ID: ${inventory.id}`);
    await handle
      .root()
      .inventory()
      .withId({ ID: inventory.id })
      .delete({ queryArgs: { version: inventory.version } })
      .execute();
  }
}
