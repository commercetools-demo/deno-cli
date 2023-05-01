import { importSimpleProduct } from "../../helpers/products/importsimpleproduct.ts";
import { baseCommand, iCommand } from "./../baseCommand.ts";

export class CommandProductImport extends baseCommand implements iCommand {
  constructor(parent: iCommand) {
    super(parent, {
      name: "import",
      description: "Import a short list of products",
    });
  }

  async action() {
    console.log("Import some products");
    await importSimpleProduct();
    this.next();
  }
}
