import { sdk, Store } from "../../deps.ts";

export async function storesAll(): Promise<Store[]> {
  const handle = await sdk.init();
  const projectKey = handle.projectKey;
  const firstresult = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
    .stores()
    .get({ queryArgs: { limit: 1 } })
    .execute();
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
    .stores()
    .get({ queryArgs: { limit: firstresult.body.total } })
    .execute();
  return result.body.results;
}
