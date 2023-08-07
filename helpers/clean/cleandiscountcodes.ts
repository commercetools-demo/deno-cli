import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function cleandiscountcodes(handle: sdk) {
  const result = await handle
    .root()
    .discountCodes()
    .get()
    .execute();
  const discountcodeslist = result.body.results;
  if (!discountcodeslist.length) console.log(`No discountcodes to delete`);
  discountcodeslist.map(async (discountcode) => {
    console.log(
      `Deleting discountcode ${discountcode.key} with ID: ${discountcode.id}`,
    );
    await handle
      .root()
      .discountCodes()
      .withId({ ID: discountcode.id })
      .delete({ queryArgs: { version: discountcode.version } })
      .execute();
  });
}
