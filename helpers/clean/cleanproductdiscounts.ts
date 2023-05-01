import { sdk } from "./../../deps.ts";

export async function cleanproductdiscounts(handle: sdk) {
  const projectKey = handle.projectKey;
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
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
      .apiRoot()
      .withProjectKey({ projectKey })
      .productDiscounts()
      .withId({ ID: productdiscounts.id })
      .delete({ queryArgs: { version: productdiscounts.version } })
      .execute();
  });
}
