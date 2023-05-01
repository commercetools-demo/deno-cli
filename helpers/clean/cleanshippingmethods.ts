import { sdk } from "./../../deps.ts";

export async function cleanshippingmethods(handle: sdk) {
  const projectKey = handle.projectKey;
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
    .shippingMethods()
    .get()
    .execute();
  const shippingmethodslist = result.body.results;
  if (!shippingmethodslist.length) console.log(`No shippingmethods to delete`);
  shippingmethodslist.map(async (shippingmethods) => {
    console.log(
      `Deleting shippingmethods ${shippingmethods.key} with ID: ${shippingmethods.id}`,
    );
    await handle
      .apiRoot()
      .withProjectKey({ projectKey })
      .shippingMethods()
      .withId({ ID: shippingmethods.id })
      .delete({ queryArgs: { version: shippingmethods.version } })
      .execute();
  });
}
