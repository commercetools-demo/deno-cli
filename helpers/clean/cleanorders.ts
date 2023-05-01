import { sdk } from "./../../deps.ts";

export async function cleanorders(handle: sdk) {
  const projectKey = handle.projectKey;
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
    .orders()
    .get()
    .execute();
  const orderslist = result.body.results;
  if (!orderslist.length) console.log(`No orders to delete`);
  orderslist.map(async (orders) => {
    console.log(`Deleting orders with ID: ${orders.id}`);
    await handle
      .apiRoot()
      .withProjectKey({ projectKey })
      .orders()
      .withId({ ID: orders.id })
      .delete({ queryArgs: { version: orders.version } })
      .execute();
  });
}
