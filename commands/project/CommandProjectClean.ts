import { Confirm } from "../../deps.ts";
import { cleanProject } from "../../helpers/project/cleanProject.ts";
import { baseCommand, iCommand } from "./../baseCommand.ts";

export class CommandProjectClean extends baseCommand implements iCommand {
  constructor(parent: iCommand) {
    super(parent, {
      name: "clean",
      description: "Clean all content of the project",
    });
  }

  async action() {
    if (this.interactive) {
      const confirmed: boolean = await Confirm.prompt("Can you confirm?");
      if (confirmed) {
        console.log("cleaning project");
        await cleanProject();
      } else console.log("no action");
      this.next();
    } else {
      console.log("cleaning project");
      await cleanProject();
    }
  }
}
