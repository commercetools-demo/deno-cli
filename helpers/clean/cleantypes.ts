import { sdk } from "./../../deps.ts";

export async function cleantypes(handle: sdk) {
  const projectKey = handle.projectKey;
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
    .types()
    .get()
    .execute();
  const typeslist = result.body.results;
  if (!typeslist.length) console.log(`No types to delete`);
  typeslist.map(async (type) => {
    console.log(`Deleting type ${type.key} with ID: ${type.id}`);
    await handle
      .apiRoot()
      .withProjectKey({ projectKey })
      .types()
      .withKey({ key: type.key })
      .delete({ queryArgs: { version: type.version } })
      .execute();
  });
}
