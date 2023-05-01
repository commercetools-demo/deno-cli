import { ProductVariant, sdk } from "../../deps.ts";

export async function listVariants(
  productID: string,
): Promise<ProductVariant[]> {
  const handle = await sdk.init();
  const projectKey = handle.projectKey;
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
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
