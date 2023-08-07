import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function cleancarts(handle: sdk) {
  const result = await handle
    .root()
    .carts()
    .get()
    .execute();
  const cartslist = result.body.results;
  if (!cartslist.length) console.log(`No carts to delete`);
  cartslist.map(async (cart: Cart) => {
    console.log(`Deleting cart ${cart.key} with ID: ${cart.id}`);
    await handle
      .root()
      .carts()
      .withId({ ID: cart.id })
      .delete({ queryArgs: { version: cart.version } })
      .execute();
  });
}
