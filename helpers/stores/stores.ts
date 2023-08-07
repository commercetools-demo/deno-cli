import { sdk, Store} from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function storesAll(): Promise<Store[]> {
  const handle = await sdk.init();

  const firstresult = await handle
    .root()
    .stores()
    .get({ queryArgs: { limit: 1 } })
    .execute();
  const result = await handle
    .root()
    .stores()
    .get({ queryArgs: { limit: firstresult.body.total } })
    .execute();
  return result.body.results;
}
