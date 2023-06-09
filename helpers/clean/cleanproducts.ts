import { sdk } from "./../../deps.ts";
// unpublish first 1-2-2023
// delete product selections aswell 1-2-2023
export async function cleanproducts(handle: sdk) {
  const projectKey = handle.projectKey;
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
    .products()
    .get()
    .execute();
  const productslist = result.body.results;
  if (!productslist.length) console.log(`No products to delete`);
  productslist.map(async (products) => {
    console.log(`unpublishing product ${products.key} with ID: ${products.id}`);
    await handle
      .apiRoot()
      .withProjectKey({ projectKey })
      .products()
      .withId({ ID: products.id })
      .post({
        body: {
          version: products.version,
          actions: [
            { action: "unpublish" },
          ],
        },
      })
      .execute();
  });

  const uResult = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
    .products()
    .get()
    .execute();
  const unpublishedProductslist = uResult.body.results;
  unpublishedProductslist.map(async (products) => {
    console.log(`Deleting products ${products.key} with ID: ${products.id}`);
    await handle
      .apiRoot()
      .withProjectKey({ projectKey })
      .products()
      .withId({ ID: products.id })
      .delete({ queryArgs: { version: products.version } })
      .execute();
  });
}
