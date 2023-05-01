import { sdk } from "./../../deps.ts";

export async function cleanchannels(handle: sdk) {
  const projectKey = handle.projectKey;
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
    .channels()
    .get()
    .execute();
  const channellist = result.body.results;
  if (!channellist.length) console.log(`No channels to delete`);
  channellist.map(async (channel) => {
    console.log(`Deleting channel ${channel.key} with ID: ${channel.id}`);
    await handle
      .apiRoot()
      .withProjectKey({ projectKey })
      .channels()
      .withId({ ID: channel.id })
      .delete({ queryArgs: { version: channel.version } })
      .execute();
  });
}
