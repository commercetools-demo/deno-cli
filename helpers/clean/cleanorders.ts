import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function cleanorders(handle: sdk) {
  const result = await handle
    .root()
    .orders()
    .get()
    .execute();
  const orderslist = result.body.results;
  if (!orderslist.length) console.log(`No orders to delete`);
  orderslist.map(async (orders) => {
    console.log(`Deleting orders with ID: ${orders.id}`);
    await handle
      .root()
      .orders()
      .withId({ ID: orders.id })
      .delete({ queryArgs: { version: orders.version } })
      .execute();
  });
}
