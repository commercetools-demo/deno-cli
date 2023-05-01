import { sdk } from "./../../deps.ts";

export async function cleanproducttypes(handle: sdk) {
  const projectKey = handle.projectKey;
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
    .productTypes()
    .get()
    .execute();
  const producttypeslist = result.body.results;
  if (!producttypeslist.length) console.log(`No producttypes to delete`);
  producttypeslist.map(async (producttypes) => {
    console.log(
      `Deleting producttypes ${producttypes.key} with ID: ${producttypes.id}`,
    );
    await handle
      .apiRoot()
      .withProjectKey({ projectKey })
      .productTypes()
      .withId({ ID: producttypes.id })
      .delete({ queryArgs: { version: producttypes.version } })
      .execute();
  });
}
