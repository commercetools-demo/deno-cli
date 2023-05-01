import { sdk } from "./../../deps.ts";

export async function cleancustomergroups(handle: sdk) {
  const projectKey = handle.projectKey;
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
    .customerGroups()
    .get()
    .execute();
  const customergrouplist = result.body.results;
  if (!customergrouplist.length) console.log(`No customergroups to delete`);
  customergrouplist.map(async (customergroup) => {
    console.log(
      `Deleting customergroup ${customergroup.key} with ID: ${customergroup.id}`,
    );
    await handle
      .apiRoot()
      .withProjectKey({ projectKey })
      .customerGroups()
      .withId({ ID: customergroup.id })
      .delete({ queryArgs: { version: customergroup.version } })
      .execute();
  });
}
