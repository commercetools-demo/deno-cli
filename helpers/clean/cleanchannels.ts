import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function cleanchannels(handle: sdk) {
  const result = await handle
    .root()
    .channels()
    .get()
    .execute();
  const channellist = result.body.results;
  if (!channellist.length) console.log(`No channels to delete`);
  for (const channel of channellist ) {
    console.log(`Deleting channel ${channel.key} with ID: ${channel.id}`);
    await handle
      .root()
      .channels()
      .withId({ ID: channel.id })
      .delete({ queryArgs: { version: channel.version } })
      .execute();
  }
}
