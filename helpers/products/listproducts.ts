import { sdk } from "../../deps.ts";

export async function listProducts(whereclause?: string) {
  const predicate = (whereclause) ? { queryArgs: { where: whereclause } } : {};
  const handle = await sdk.init();
  const projectKey = handle.projectKey;
  try {
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
    .products()
    .get(predicate)
    .execute();
  return result.body.results;
  }
  catch (_error) {
    return undefined
  }
}
