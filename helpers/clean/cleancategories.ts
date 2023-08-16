import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function cleancategories(handle: sdk) {
  const result = await handle
    .root()
    .categories()
    .get({ queryArgs: { limit: 100 } })
    .execute();
  const categorylist = result.body.results;
  if (!categorylist.length) console.log(`No categories to delete`);
  for (const category of categorylist) {
    console.log(`Deleting category ${category.key} with ID: ${category.id}`);
    await handle
      .root()
      .categories()
      .withId({ ID: category.id })
      .delete({ queryArgs: { version: category.version } })
      .execute();
  };
}
