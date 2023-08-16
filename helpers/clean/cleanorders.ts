import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function cleanorders(handle: sdk) {
  const result = await handle
    .root()
    .orders()
    .get({queryArgs: {limit: 500}})
    .execute();
  const orderslist = result.body.results;
  if (!orderslist.length) console.log(`No orders to delete`);
  for (const order of orderslist) {
    console.log(`Deleting orders with ID: ${order.id}`);
    await handle
      .root()
      .orders()
      .withId({ ID: order.id })
      .delete({ queryArgs: { version: order.version } })
      .execute();
  }
}
