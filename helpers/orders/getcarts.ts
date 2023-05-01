import { Cart, sdk } from "../../deps.ts";

export async function carts(): Promise<Cart[]> {
  const handle = sdk.init()
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey: handle.projectKey })
    .carts()
    .get()
    .execute();
  return result.body.results;
}

const mycarts = await carts()
console.log(JSON.stringify(mycarts, null, 3))