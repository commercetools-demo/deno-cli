import { sdk } from "./../../deps.ts";

async function getCustomerList(handle: sdk) {
  const projectKey = handle.projectKey;
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
    .customers()
    .get()
    .execute();
  return result.body;
}

async function deleteCustomer(handle: sdk, customer: Customer) {
  const projectKey = handle.projectKey;
  try {
    await handle
      .apiRoot()
      .withProjectKey({ projectKey })
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

  if (!customerlist.length) console.log(`No customers to delete`);
  customerlist.map(async (customer) => {
    console.log(`Deleting customer ${customer.key} with ID: ${customer.id}`);
    await deleteCustomer(handle, customer);
  });

  const check = await getCustomerList(handle);
  if (check.total != 0) cleancustomers(handle); // recurse until done....
}
