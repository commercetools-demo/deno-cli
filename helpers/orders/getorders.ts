import { Order, sdk } from "../../deps.ts";

export async function getOrders(): Promise<Order[]> {
  const handle = sdk.init()
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey: handle.projectKey })
    .orders()
    .get()
    .execute();
  return result.body.results;
}
