import { Confirm } from "https://deno.land/x/cliffy/prompt/mod.ts";
import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";
import { cleanproducts } from "../../helpers/clean/cleanproducts.ts";
import { baseCommand, iCommand } from "./../baseCommand.ts";

export class CommandProductClean extends baseCommand implements iCommand {
  constructor(parent: iCommand) {
    super(parent, { name: "clean", description: "Clean all products" });
  }

  async action() {
    if (this.interactive) {
      const confirmed: boolean = await Confirm.prompt("Can you confirm?");
      if (confirmed) { 
        console.log("cleaning Products");
        const handle = sdk.init();
        await cleanproducts(handle)
      }
      else console.log("no action");
      this.next();
    }
    else {
      const handle = sdk.init();
      await cleanproducts(handle)
    }
  }
}
