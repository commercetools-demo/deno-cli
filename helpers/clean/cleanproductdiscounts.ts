import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function cleanproductdiscounts(handle: sdk) {
  const result = await handle
    .root()
    .productDiscounts()
    .get()
    .execute();
  const productdiscountslist = result.body.results;
  if (!productdiscountslist.length) {console.log(`No productdiscounts to delete`)}
  for (const productdiscount of productdiscountslist) {
    console.log(
      `Deleting productdiscounts ${productdiscount.key} with ID: ${productdiscount.id}`,
    );
    await handle
      .root()
      .productDiscounts()
      .withId({ ID: productdiscount.id })
      .delete({ queryArgs: { version: productdiscount.version } })
      .execute();
  };
}
