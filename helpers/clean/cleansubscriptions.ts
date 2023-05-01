import { sdk } from "./../../deps.ts";

export async function cleansubscriptions(handle: sdk) {
  const projectKey = handle.projectKey;
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
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
      .apiRoot()
      .withProjectKey({ projectKey })
      .subscriptions()
      .withId({ ID: subscriptions.id })
      .delete({ queryArgs: { version: subscriptions.version } })
      .execute();
  });
}
