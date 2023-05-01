import { sdk } from "./../../deps.ts";

export async function cleanextensions(handle: sdk) {
  const projectKey = handle.projectKey;
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
    .extensions()
    .get()
    .execute();
  const extensionslist = result.body.results;
  if (!extensionslist.length) console.log(`No extensions to delete`);
  extensionslist.map(async (extensions) => {
    console.log(
      `Deleting extensions ${extensions.key} with ID: ${extensions.id}`,
    );
    await handle
      .apiRoot()
      .withProjectKey({ projectKey })
      .extensions()
      .withId({ ID: extensions.id })
      .delete({ queryArgs: { version: extensions.version } })
      .execute();
  });
}
