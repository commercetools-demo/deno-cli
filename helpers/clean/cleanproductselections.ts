import { sdk } from "./../../deps.ts";

export async function cleanproductselections(handle: sdk) {
  const projectKey = handle.projectKey;
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
    .productSelections()
    .get()
    .execute();
  const productselectionslist = result.body.results;
  if (!productselectionslist.length) {
    console.log(`No productselections to delete`);
  }
  productselectionslist.map(async (productselections) => {
    console.log(`Deleting productselection with ID: ${productselections.id}`);
    await handle
      .apiRoot()
      .withProjectKey({ projectKey })
      .productSelections()
      .withId({ ID: productselections.id })
      .delete({ queryArgs: { version: productselections.version } })
      .execute();
  });
}
