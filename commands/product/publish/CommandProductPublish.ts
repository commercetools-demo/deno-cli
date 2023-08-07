import {
  publishAllModifiedProducts,
  publishProductByID,
  publishProductByKey,
} from "../../../helpers/products/publishproducts.ts";
import { colors } from "https://deno.land/x/cliffy/ansi/colors.ts";
import { prompt, Select } from "https://deno.land/x/cliffy/prompt/mod.ts";
import { baseCommand, iCommand } from "./../../baseCommand.ts";
import { listProducts } from "../../../helpers/products/listproducts.ts";

export class CommandProductPublish extends baseCommand implements iCommand {
  constructor(parent: iCommand) {
    super(parent, {
      name: "publish",
      description: "publish a modified product",
    });
    this._cmd.arguments("<target>");
    this._cmd.example("key", "key=duck to publish a product with key duck");
    this._cmd.example("id", "id=12345 to publish a product with id 12345");
    this._cmd.example("all", "all to publish all modified products");
  }

  async action() {
    //console.log("running product publish")
    if (this.interactive) {
      const productList = await listProducts(
        "masterData(published=false) or masterData(hasStagedChanges=true)",
      );
      const options = [];
      for (const product of productList) {
        options.push({ name: product.key, value: product.id });
      }
      options.push("all");
      options.push("back");
      const result = await prompt([{
        name: "select",
        message: "What product do you want to publish?",
        type: Select,
        options: options,
      }]);
      let publishingResult = undefined;
      switch (result.select) {
        case "back" || undefined: {
          break;
        }
        case "all": {
          publishingResult = await publishAllModifiedProducts();
          break;
        }
        default: {
          publishingResult = await publishProductByID(result.select!);
        }
      }
      console.log(publishingResult);
      this.next();
    } else {
      if (this._cmd.getRawArgs().length) {
        const target = this._cmd.getRawArgs()[0];
        if (target.includes("id=")) {
          const id = target.replace("id=", "");
          const result = await publishProductByID(id);
          console.log(result);
          return;
        }
        if (target.includes("key=")) {
          const key = target.replace("key=", "");
          const result = await publishProductByKey(key);
          console.log(result);
          return;
        }
        if (target === "all") {
          const result = await publishAllModifiedProducts();
          console.log(result);
          return;
        }
        console.log(colors.red("invalid argument: " + colors.red.bold(target)));
        this._cmd.showHelp();
      }
    }
  }
}
