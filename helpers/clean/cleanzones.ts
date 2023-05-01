import { sdk } from "./../../deps.ts";

export async function cleanzones(handle: sdk) {
  const projectKey = handle.projectKey;
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
    .zones()
    .get()
    .execute();
  const zoneslist = result.body.results;
  if (!zoneslist.length) console.log(`No zones to delete`);
  zoneslist.map(async (zones) => {
    console.log(`Deleting zones ${zones.key} with ID: ${zones.id}`);
    await handle
      .apiRoot()
      .withProjectKey({ projectKey })
      .zones()
      .withId({ ID: zones.id })
      .delete({ queryArgs: { version: zones.version } })
      .execute();
  });
}
