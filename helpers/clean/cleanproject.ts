import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

async function version(handle: sdk): Promise<number> {
  const result = await handle
    .root()
    .get()
    .execute();
  return result.body.version;
}

export async function cleanproject(handle: sdk) {
  const versionno = await version(handle);
  console.log(
    `Cleaning countries, currencies and languages from ${projectKey}`,
  );
  await handle
    .root()
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
