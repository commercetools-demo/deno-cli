import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function cleanzones(handle: sdk) {
  const result = await handle
    .root()
    .zones()
    .get()
    .execute();
  const zoneslist = result.body.results;
  if (!zoneslist.length) console.log(`No zones to delete`);
  for (const zone of zoneslist) {
    console.log(`Deleting zones ${zone.key} with ID: ${zone.id}`);
    await handle
      .root()
      .zones()
      .withId({ ID: zone.id })
      .delete({ queryArgs: { version: zone.version } })
      .execute();
  }
}
