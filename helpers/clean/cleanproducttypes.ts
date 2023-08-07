import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function cleanproducttypes(handle: sdk) {
  const result = await handle
    .root()
    .productTypes()
    .get()
    .execute();
  const producttypeslist = result.body.results;
  if (!producttypeslist.length) console.log(`No producttypes to delete`);
  for (const producttypes of producttypeslist) {
    console.log(`Deleting producttypes ${producttypes.key} with ID: ${producttypes.id}`);
    await handle
      .root()
      .productTypes()
      .withId({ ID: producttypes.id })
      .delete({ queryArgs: { version: producttypes.version } })
      .execute();
  }
}
