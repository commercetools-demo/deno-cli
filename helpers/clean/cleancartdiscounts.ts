import { sdk } from "./../../deps.ts";

export async function cleancartdiscounts(handle: sdk) {
  const projectKey = handle.projectKey;
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
    .cartDiscounts()
    .get()
    .execute();
  const cartdiscountslist = result.body.results;
  if (!cartdiscountslist.length) console.log(`No cartdiscounts to delete`);
  cartdiscountslist.map(async (cartdiscounts) => {
    console.log(
      `Deleting cartdiscounts ${cartdiscounts.key} with ID: ${cartdiscounts.id}`,
    );
    await handle
      .apiRoot()
      .withProjectKey({ projectKey })
      .cartDiscounts()
      .withId({ ID: cartdiscounts.id })
      .delete({ queryArgs: { version: cartdiscounts.version } })
      .execute();
  });
}
