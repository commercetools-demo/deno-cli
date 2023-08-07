import { sdk, ProductVariant } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";
export async function listVariants(
  productID: string,
): Promise<ProductVariant[]> {
  const handle = await sdk.init();
  const result = await handle
    .root()
    .products()
    .withId({ ID: productID })
    .get(
      {
        queryArgs: {
          expand: [
            "masterData.current.masterVariant.prices[*].channel",
            "masterData.current.variants[*].prices[*].channel",
          ],
        },
      },
    )
    .execute();
  const variants: ProductVariant[] = [];
  variants.push(result.body.masterData.current.masterVariant);
  variants.push(...result.body.masterData.current.variants);
  return variants;
}
