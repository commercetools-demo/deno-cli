import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function publishProductByKey(key: string) {
  const handle = await sdk.init();
  const result = await handle
    .root()
    .products()
    .withKey({ key: key })
    .get()
    .execute();
  const product = result.body;
  if (!product.masterData.hasStagedChanges && product.masterData.published) {
    return "No changes in product";
  }
  if (product) {
    await handle
      .root()
      .products()
      .withId({ ID: product.id })
      .post({
        body: {
          version: product.version,
          actions: [
            { action: "publish" },
          ],
        },
      })
      .execute();
  }
  return `published product ${product.key} version ${product.version}`;
}

export async function publishProductByID(id: string) {
  const handle = await sdk.init();
  const result = await handle
    .root()
    .products()
    .withId({ ID: id })
    .get()
    .execute();
  const product = result.body;
  if (!product.masterData.hasStagedChanges && product.masterData.published) {
    return "No changes in product";
  }
  if (product) {
    await handle
      .root()
      .products()
      .withId({ ID: product.id })
      .post({
        body: {
          version: product.version,
          actions: [
            { action: "publish" },
          ],
        },
      })
      .execute();
  }
  return `published product ${product.key} version ${product.version}`;
}

export async function publishAllModifiedProducts() {
  const handle = await sdk.init();
  const result = await handle
    .root()
    .products()
    .get()
    .execute();
  const productslist = result.body.results;
  let response = "";
  if (!productslist.length) response += `No products to publish`;
  for (const product of productslist) {
    //productslist.forEach(async (product) => {
    if (!product.masterData.hasStagedChanges && product.masterData.published) {
      continue;
    }
    await handle
      .root()
      .products()
      .withId({ ID: product.id })
      .post({
        body: {
          version: product.version,
          actions: [
            { action: "publish" },
          ],
        },
      })
      .execute();
    response += `publised product ${product.key} with ID: ${product.id}\n`;
  }
  return response;
}
