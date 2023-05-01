import { Customer, sdk } from "../../deps.ts";

export async function customerDetails(id: string): Promise<Customer> {
  const handle = sdk.init();
  const cust = await handle
    .apiRoot()
    .withProjectKey({ projectKey: handle.projectKey })
    .customers()
    .withId({ ID: id })
    .get()
    .execute();
  return cust.body;
}
