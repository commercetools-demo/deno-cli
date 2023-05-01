import { sdk } from "./../../deps.ts";

export async function cleantaxcategories(handle: sdk) {
  const projectKey = handle.projectKey;
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
    .taxCategories()
    .get()
    .execute();
  const taxcategorylist = result.body.results;
  if (!taxcategorylist.length) console.log(`No taxes to delete`);
  taxcategorylist.map(async (taxcategory) => {
    console.log(
      `Deleting taxcategory ${taxcategory.key} with ID: ${taxcategory.id}`,
    );
    await handle
      .apiRoot()
      .withProjectKey({ projectKey })
      .taxCategories()
      .withId({ ID: taxcategory.id })
      .delete({ queryArgs: { version: taxcategory.version } })
      .execute();
  });
}
