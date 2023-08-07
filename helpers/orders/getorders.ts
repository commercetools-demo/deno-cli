import { sdk, Order } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function getOrders(): Promise<Order[]> {
  const handle = sdk.init()
  const result = await handle
    .root()
    .orders()
    .get()
    .execute();
  return result.body.results;
}
