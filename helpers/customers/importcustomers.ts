import { importsdk, ImportContainer, ImportOperationStatus, CustomerImport, } from "https://deno.land/x/commercetools_demo_sdk/importsdk.ts";
import { colors } from "https://deno.land/x/cliffy/ansi/colors.ts";
import { importbatch } from "./../import/batchimport.ts";

async function importCustomers(
  importer: importsdk,
  container: ImportContainer,
  customers: CustomerImport[],
): Promise<ImportOperationStatus[]> {
  const result = await importer
    .root()
    .customers()
    .importContainers()
    .withImportContainerKeyValue({ importContainerKey: container.key })
    .post({ body: { type: "customer", resources: customers } })
    .execute();
  return result.body.operationStatus;
}

export async function importRandomCustomers(count = 20) {
  const randomendpoint =
    `https://my.api.mockaroo.com/customer.json?key=00aa64c0&count=${count}`;
  // mockeroo
  console.log(colors.green(`fetching ${count + ""} customers from mockaroo`));
  const customersresponse = await fetch(randomendpoint);
  const customerdata = await customersresponse.json();
  console.log(
    `fetched ${colors.green(customerdata.length + "")} customers from Mockaroo`,
  );

  // importbatch
  const containername = "my-import-container";
  const operations = await importbatch(
    containername,
    customerdata,
    importCustomers,
  ); // import customers in batches of 20
  console.log(`imported a total of ${operations.length} customers`);
}
