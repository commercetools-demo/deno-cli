import { sdk, Customer } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

async function getCustomerList(handle: sdk) {
  const result = await handle
    .root()
    .customers()
    .get()
    .execute();
  return result.body;
}

async function deleteCustomer(handle: sdk, customer: Customer) {
  try {
    await handle
      .root()
      .customers()
      .withId({ ID: customer.id })
      .delete({ queryArgs: { version: customer.version } })
      .execute();
  } catch (error) {
    console.log(error);
  }
}

export async function cleancustomers(handle: sdk) {
  const first = await getCustomerList(handle);
  const customerlist = first.results;
  for (const customer of customerlist) {
    console.log(`Deleting customer ${customer.key} with ID: ${customer.id}`);
    await deleteCustomer(handle, customer);
  }
  const check = await getCustomerList(handle);
  if (check.total != 0) cleancustomers(handle); // recurse until done....
}
