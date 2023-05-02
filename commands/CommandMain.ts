import { Command } from "../deps.ts";
import { baseCommand, iCommand } from "./baseCommand.ts";
import version from "./../version.json" assert { type: "json" };

export class CommandMain extends baseCommand implements iCommand {
  constructor() {
    super(undefined, { name: "cli", description: "command line interface for commercetools" });
    this._cmd = new Command()
      .name("cli")
      .description("command line interface for commercetools")
      .version(this.version())
      .option("-i, --interactive", "run interactive")
      .action(function ({ interactive }) {
        if (!interactive) this.showHelp();
      });
  }

  async action() {
    if (CommandMain.interactive) await this.run();
    else this._cmd.showHelp();
  }


  
  version() {
    return version.version
  }
}
