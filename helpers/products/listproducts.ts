import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function listProducts(whereclause?: string) {
  const predicate = (whereclause) ? { queryArgs: { where: whereclause } } : {};
  const handle = await sdk.init();
  try {
    const result = await handle
      .root()
      .products()
      .get(predicate)
      .execute();
    return result.body.results;
  }
  catch (_error) {
    return undefined
  }
}
