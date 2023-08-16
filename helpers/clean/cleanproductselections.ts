import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function cleanproductselections(handle: sdk) {
  const result = await handle
    .root()
    .productSelections()
    .get()
    .execute();
  const productselectionslist = result.body.results;
  if (!productselectionslist.length) console.log(`No productselections to delete`)
  for (const productselections of productselectionslist) {
    console.log(`Deleting productselection with ID: ${productselections.id}`);
    await handle
      .root()
      .productSelections()
      .withId({ ID: productselections.id })
      .delete({ queryArgs: { version: productselections.version } })
      .execute();
  }
}
