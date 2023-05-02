import { colors, ProductVariant, prompt, Select, Table } from "../../deps.ts";
import { listProducts } from "../../helpers/products/listproducts.ts";
import { listVariants } from "../../helpers/products/listvariants.ts";
import { baseCommand, iCommand } from "./../baseCommand.ts";
import { formatPrice } from "../../helpers/price/price.ts";

export class CommandProductList extends baseCommand implements iCommand {
  constructor(parent: iCommand) {
    super(parent, { name: "list", description: "list all products" });
  }

  async action() {
    if (this.interactive) {
      console.log("running product list interactive");
      const productList = await listProducts();
      if (productList === undefined) return
      const options = [];
      for (const product of productList) {
        options.push({
          name: product.masterData.current
            .name[CommandProductList.globals!.language],
          value: product.id,
        });
      }
      options.push(Select.separator("--------"));
      options.push("back");
      const productSelector = await prompt([{
        name: "product",
        message: "Select a product for more details",
        type: Select,
        options: options,
      }]);
      const selectedProduct = productSelector.product!;
      if (selectedProduct !== 'back') {
        const variantsList = await listVariants(selectedProduct);
        const variantOptions = [];
        for (const variant of variantsList) {
          variantOptions.push({
            name: `${variant.id}: ${variant.key!} (${variant.sku!})`,
            value: (variant.id) - 1 + "",
          });
        }
        const variantSelector = await prompt([{
          name: "variant",
          message: "Select a variant for more details",
          type: Select,
          options: variantOptions,
        }]);
        const index = Number(variantSelector.variant!);
        this.showVariant(variantsList[index]);
      }
      this.next();
    } else {
      await this.list();
      this.next();
    }
  }

  private showVariant(variant: ProductVariant) {
    const table = new Table();
    table.header(["id", "sku", "key"]);
    table.body([
      [variant.id, variant.sku, variant.key!],
      //
      //this.variantImages(variant),
      //this.variantAttributes(variant),
      //this.variantAssets(variant)
    ]);
    table.border(true);
    table.render();
    this.variantPices(variant);
  }

  private variantChannel(channel: any): string {
    //console.log(channel)
    if (channel === undefined) return "";
    if (channel.obj == undefined) return "";
    if (channel.obj.name === undefined) return "";
    return channel.obj.name[CommandProductList.globals!.language];
  }

  private variantPices(variant: ProductVariant) {
    const table = new Table();
    table.header([
      "key",
      "channel",
      "country",
      "customergroups",
      "discounted",
      "tiers",
      "period",
      "value",
    ]);
    for (const price of variant.prices!) {
      table.push([
        price.key!,
        this.variantChannel(price.channel),
        (price.country!) ? price.country : "",
        (price.customerGroup) ? price.customerGroup.id : "",
        (price.discounted) ? "x" : "",
        (price.tiers) ? JSON.stringify(price.tiers) : "",
        (price.validFrom || price.validUntil)
          ? price.validFrom + " - " + price.validUntil
          : "",
        formatPrice(price),
      ]);
    }
    table.border(true)
      .maxColWidth(20);
    table.render();
  }

  private async list() {
    const products = await listProducts();

    const table: Table = new Table();
    table.header([
      colors.bold.blue("v"),
      colors.bold.blue("p"),
      colors.bold.blue("name"),
      colors.bold.blue("id"),
      colors.bold.blue("variants"),
    ]);
    for (const product of products) {
      const published = (product.masterData.published) ? "*" : "!";
      const name = product.masterData.current.name["en-GB"];
      const id = product.id;
      const variants = product.masterData.current.variants.length;
      const version = product.version;
      table.push([version, published, name, id, variants]);
    }
    table.border(false);
    table.render();
  }
}
