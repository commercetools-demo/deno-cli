import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function cleantaxcategories(handle: sdk) {
  const result = await handle
    .root()
    .taxCategories()
    .get()
    .execute();
  const taxcategorylist = result.body.results;
  if (!taxcategorylist.length) console.log(`No taxes to delete`);
  for (const taxcategory of taxcategorylist) {
    console.log(`Deleting taxcategory ${taxcategory.key} with ID: ${taxcategory.id}`)
    await handle
      .root()
      .taxCategories()
      .withId({ ID: taxcategory.id })
      .delete({ queryArgs: { version: taxcategory.version } })
      .execute();
  }
}
