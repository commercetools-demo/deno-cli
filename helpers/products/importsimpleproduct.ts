import { importsdk, ImportContainer, ImportOperationStatus, ProductImport, } from "https://deno.land/x/commercetools_demo_sdk/importsdk.ts";
import duck from "./definitions/duck.json" assert { type: "json" };
import { importbatch } from "../import/batchimport.ts";

async function importProducts(
  importer: importsdk,
  container: ImportContainer,
  products: ProductImport[],
): Promise<ImportOperationStatus[]> {
  const result = await importer
    .root()
    .productDrafts()
    .importContainers()
    .withImportContainerKeyValue({ importContainerKey: container.key })
    .post({ body: { type: "product-draft", resources: products } })
    .execute();
  return result.body.operationStatus;
}

export async function importSimpleProduct() {
  // importbatch
  const containername = "my-import-container";
  const productdata = [...duck]
  const operations = await importbatch(
    containername,
    productdata,
    importProducts,
  ); // import products in batches of 20
  console.log(`imported a total of ${operations.length} products`);
}