import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function cleanzones(handle: sdk) {
  const result = await handle
    .root()
    .zones()
    .get()
    .execute();
  const zoneslist = result.body.results;
  if (!zoneslist.length) console.log(`No zones to delete`);
  zoneslist.map(async (zones) => {
    console.log(`Deleting zones ${zones.key} with ID: ${zones.id}`);
    await handle
      .root()
      .zones()
      .withId({ ID: zones.id })
      .delete({ queryArgs: { version: zones.version } })
      .execute();
  });
}
