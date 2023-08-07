import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function cleanextensions(handle: sdk) {
  const result = await handle
    .root()
    .extensions()
    .get()
    .execute();
  const extensionslist = result.body.results;
  if (!extensionslist.length) console.log(`No extensions to delete`);
  extensionslist.map(async (extensions) => {
    console.log(
      `Deleting extensions ${extensions.key} with ID: ${extensions.id}`,
    );
    await handle
      .root()
      .extensions()
      .withId({ ID: extensions.id })
      .delete({ queryArgs: { version: extensions.version } })
      .execute();
  });
}
