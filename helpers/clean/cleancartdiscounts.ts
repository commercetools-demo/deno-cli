import { sdk, CartDiscount } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function cleancartdiscounts(handle: sdk) {
  const result = await handle
    .root()
    .cartDiscounts()
    .get()
    .execute();
  const cartdiscountslist = result.body.results;
  if (!cartdiscountslist.length) console.log(`No cartdiscounts to delete`);
  cartdiscountslist.map(async (cartdiscount: CartDiscount) => {
    console.log(
      `Deleting cartdiscounts ${cartdiscount.key} with ID: ${cartdiscount.id}`,
    );
    await handle
      .root()
      .cartDiscounts()
      .withId({ ID: cartdiscount.id })
      .delete({ queryArgs: { version: cartdiscount.version } })
      .execute();
  });
}
