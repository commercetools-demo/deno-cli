import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function cleanshippingmethods(handle: sdk) {
  const result = await handle
    .root()
    .shippingMethods()
    .get()
    .execute();
  const shippingmethodslist = result.body.results;
  if (!shippingmethodslist.length) console.log(`No shippingmethods to delete`);
  for (const shippingmethod of shippingmethodslist) {
    console.log(`Deleting shippingmethods ${shippingmethod.key} with ID: ${shippingmethod.id}`);
    await handle
      .root()
      .shippingMethods()
      .withId({ ID: shippingmethod.id })
      .delete({ queryArgs: { version: shippingmethod.version } })
      .execute();
  }
}
