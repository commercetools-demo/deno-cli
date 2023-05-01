import { Confirm } from "../../deps.ts";
import { clean } from "../../helpers/configure/clean.ts";
import { baseCommand, iCommand } from "../baseCommand.ts";

export class CommandConfigureClean extends baseCommand implements iCommand {
  constructor(parent: iCommand) {
    super(parent, {
      name: "clean",
      description: "clean the terraform configuration cache",
    });
  }

  async action() {
    console.log("cleaning");
    let confirmed = true;
    if (this.interactive) {
      confirmed = await Confirm.prompt("Can you confirm?");
    }
    if (confirmed) clean();
    this.next();
  }
}
