import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function cleansubscriptions(handle: sdk) {
  const result = await handle
    .root()
    .subscriptions()
    .get()
    .execute();
  const subscriptionslist = result.body.results;
  if (!subscriptionslist.length) console.log(`No subscriptions to delete`);
  for (const subscription of subscriptionslist) {
    console.log(`Deleting subscriptions ${subscription.key} with ID: ${subscription.id}`);
    await handle
      .root()
      .subscriptions()
      .withId({ ID: subscription.id })
      .delete({ queryArgs: { version: subscription.version } })
      .execute();
  };
}
