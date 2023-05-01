import { Confirm } from "../../deps.ts";
import { baseCommand, iCommand } from "./../baseCommand.ts";

export class CommandProductClean extends baseCommand implements iCommand {
  constructor(parent: iCommand) {
    super(parent, { name: "clean", description: "Clean all products" });
  }

  async action() {
    if (this.interactive) {
      const confirmed: boolean = await Confirm.prompt("Can you confirm?");
      if (confirmed) console.log("cleaning Products");
      else console.log("no action");
      this.next();
    }
  }
}
