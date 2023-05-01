import { sdk } from "./../../deps.ts";

async function version(handle: sdk): Promise<number> {
  const projectKey = handle.projectKey;
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
    .get()
    .execute();
  return result.body.version;
}

export async function cleanproject(handle: sdk) {
  const projectKey = handle.projectKey;
  const versionno = await version(handle);
  console.log(
    `Cleaning countries, currencies and languages from ${projectKey}`,
  );
  await handle
    .apiRoot()
    .withProjectKey({ projectKey })
    .post({
      body: {
        actions: [
          { action: "changeCountries", countries: [] },
          { action: "changeCurrencies", currencies: ["EUR"] },
          { action: "changeLanguages", languages: ["en"] },
        ],
        version: versionno,
      },
    })
    .execute();
}
