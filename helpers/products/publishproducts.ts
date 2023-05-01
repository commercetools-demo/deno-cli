import { sdk } from "../../deps.ts";

export async function publishProductByKey(key: string) {
  const handle = await sdk.init();
  const projectKey = handle.projectKey;
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
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
      .apiRoot()
      .withProjectKey({ projectKey })
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
  const projectKey = handle.projectKey;
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
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
      .apiRoot()
      .withProjectKey({ projectKey })
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
  const projectKey = handle.projectKey;
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
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
      .apiRoot()
      .withProjectKey({ projectKey })
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
