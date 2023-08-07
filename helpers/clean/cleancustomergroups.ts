import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function cleancustomergroups(handle: sdk) {
  const result = await handle
    .root()
    .customerGroups()
    .get()
    .execute();
  const customergrouplist = result.body.results;
  if (!customergrouplist.length) console.log(`No customergroups to delete`);
  for (const customergroup of customergrouplist) {
    console.log(
      `Deleting customergroup ${customergroup.key} with ID: ${customergroup.id}`,
    );
    await handle
      .root()
      .customerGroups()
      .withId({ ID: customergroup.id })
      .delete({ queryArgs: { version: customergroup.version } })
      .execute();
  }    
}
