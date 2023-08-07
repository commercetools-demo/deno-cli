import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function cleantypes(handle: sdk) {
  const result = await handle
    .root()
    .types()
    .get()
    .execute();
  const typeslist = result.body.results;
  if (!typeslist.length) console.log(`No types to delete`)
  for (const type of typeslist) {
    console.log(`Deleting type ${type.key} with ID: ${type.id}`);
    await handle
      .root()
      .types()
      .withKey({ key: type.key })
      .delete({ queryArgs: { version: type.version } })
      .execute();
  }
}
