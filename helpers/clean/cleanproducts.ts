import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";
// unpublish first 1-2-2023
// delete product selections aswell 1-2-2023
export async function cleanproducts(handle: sdk) {
  const result = await handle
    .root()
    .products()
    .get()
    .execute();
  const productslist = result.body.results;
  if (!productslist.length) console.log(`No products to delete`);
  for (const product of productslist) {
    console.log(`unpublishing product ${product.key} with ID: ${product.id}`);
    await handle
      .root()
      .products()
      .withId({ ID: product.id })
      .post({
        body: {
          version: product.version,
          actions: [
            { action: "unpublish" },
          ],
        },
      })
      .execute();
  }

  const uResult = await handle
    .root()
    .products()
    .get()
    .execute();
  const unpublishedProductslist = uResult.body.results;
  for (const product of unpublishedProductslist) {
    console.log(`Deleting products ${product.key} with ID: ${product.id}`);
    await handle
      .root()
      .products()
      .withId({ ID: product.id })
      .delete({ queryArgs: { version: product.version } })
      .execute();
  }
}
