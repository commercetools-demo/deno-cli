import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function cleanextensions(handle: sdk) {
  const result = await handle
    .root()
    .extensions()
    .get()
    .execute();
  const extensionslist = result.body.results;
  if (!extensionslist.length) console.log(`No extensions to delete`);
  for (const extension of extensionslist) {
    console.log(
      `Deleting extensions ${extension.key} with ID: ${extension.id}`,
    );
    await handle
      .root()
      .extensions()
      .withId({ ID: extension.id })
      .delete({ queryArgs: { version: extension.version } })
      .execute();
  }
}
