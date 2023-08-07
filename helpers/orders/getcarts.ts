import { sdk, Cart } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function carts(): Promise<Cart[]> {
  const handle = sdk.init()
  const result = await handle
    .root()
    .carts()
    .get()
    .execute();
  return result.body.results;
}

const mycarts = await carts()
console.log(JSON.stringify(mycarts, null, 3))