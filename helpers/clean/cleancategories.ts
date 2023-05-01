import { sdk } from "./../../deps.ts";

export async function cleancategories(handle: sdk) {
  const projectKey = handle.projectKey;
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
    .categories()
    .get({ queryArgs: { limit: 100 } })
    .execute();
  const categorylist = result.body.results;
  if (!categorylist.length) console.log(`No categories to delete`);
  categorylist.map(async (category) => {
    console.log(`Deleting category ${category.key} with ID: ${category.id}`);
    await handle
      .apiRoot()
      .withProjectKey({ projectKey })
      .categories()
      .withId({ ID: category.id })
      .delete({ queryArgs: { version: category.version } })
      .execute();
  });
}
