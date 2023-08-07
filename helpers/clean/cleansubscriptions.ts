import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function cleansubscriptions(handle: sdk) {
  const result = await handle
    .root()
    .subscriptions()
    .get()
    .execute();
  const subscriptionslist = result.body.results;
  if (!subscriptionslist.length) console.log(`No subscriptions to delete`);
  subscriptionslist.map(async (subscriptions) => {
    console.log(
      `Deleting subscriptions ${subscriptions.key} with ID: ${subscriptions.id}`,
    );
    await handle
      .root()
      .subscriptions()
      .withId({ ID: subscriptions.id })
      .delete({ queryArgs: { version: subscriptions.version } })
      .execute();
  });
}
