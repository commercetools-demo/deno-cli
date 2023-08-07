import { sdk, Customer } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function customerDetails(id: string): Promise<Customer> {
  const handle = sdk.init();
  const cust = await handle
    .root()
    .customers()
    .withId({ ID: id })
    .get()
    .execute();
  return cust.body;
}
