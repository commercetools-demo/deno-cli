import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function cleanproductdiscounts(handle: sdk) {
  const result = await handle
    .root()
    .productDiscounts()
    .get()
    .execute();
  const productdiscountslist = result.body.results;
  if (!productdiscountslist.length) {
    console.log(`No productdiscounts to delete`);
  }
  productdiscountslist.map(async (productdiscounts) => {
    console.log(
      `Deleting productdiscounts ${productdiscounts.key} with ID: ${productdiscounts.id}`,
    );
    await handle
      .root()
      .productDiscounts()
      .withId({ ID: productdiscounts.id })
      .delete({ queryArgs: { version: productdiscounts.version } })
      .execute();
  });
}
