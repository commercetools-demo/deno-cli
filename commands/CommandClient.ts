import { sdk } from "./../deps.ts";
import { colors } from "./../deps.ts";
import { baseCommand, iCommand } from "./baseCommand.ts";

export class CommandClient extends baseCommand implements iCommand {
  constructor(parent: iCommand) {
    super(parent, {
      name: "client",
      description: "List the API client details",
    });
  }

  action() {
    console.log("action from client");
    try {
      const handle = sdk.init();
      console.log(colors.blue.bold("PROJECTKEY=") + handle.config.project_key);
      console.log(colors.blue.bold("CLIENT_ID=") + handle.config.client_id);
      console.log(
        colors.blue.bold("CLIENT_SECRET=") + handle.config.client_secret,
      );
      console.log(colors.blue.bold("API_URL=") + handle.config.api_url);
      console.log(colors.blue.bold("AUTH_URL=") + handle.config.auth_url);
      console.log(colors.blue.bold("IMPORT_URL=") + handle.config.import_url);
    } catch (error) {
      console.log(error);
      return false;
    }
    this.next();
  }
}
