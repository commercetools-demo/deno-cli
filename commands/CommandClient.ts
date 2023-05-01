import { sdk } from "./../deps.ts";
import { view } from "./view.ts"
import { baseCommand, iCommand } from "./baseCommand.ts";

export class CommandClient extends baseCommand implements iCommand {
  constructor(parent: iCommand) {
    super(parent, {
      name: "client",
      description: "List the API client details",
    });
  }

  async action() {
    console.log("action from client");
    try {
      const handle = sdk.init();
      await view.render('client.view', {config: handle.config}, "client")
    } catch (error) {
      console.log(error);
      return false;
    }
    this.next();
  }
}
