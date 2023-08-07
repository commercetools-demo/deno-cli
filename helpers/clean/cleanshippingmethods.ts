import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function cleanshippingmethods(handle: sdk) {
  const result = await handle
    .root()
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
      .root()
      .shippingMethods()
      .withId({ ID: shippingmethods.id })
      .delete({ queryArgs: { version: shippingmethods.version } })
      .execute();
  });
}
