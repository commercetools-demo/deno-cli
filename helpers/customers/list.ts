import { sdk } from "../../deps.ts";

async function getCustomers(handle: sdk, offset?: number, limit?: number) {
  const customers = await handle
    .apiRoot()
    .withProjectKey({ projectKey: handle.projectKey })
    .customers()
    .get({ queryArgs: { offset: offset, limit: limit } })
    .execute();
  return customers;
}

export async function listCustomers(start = 0, limit = 20) {
  const handle = sdk.init();
  const list = await getCustomers(handle, start, limit);
  return list;
}
