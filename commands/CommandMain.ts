import { Command } from "../deps.ts";
import { baseCommand, iCommand, iGlobals } from "./baseCommand.ts";
import build from "./../version.json" assert { type: "json" };

export class CommandMain extends baseCommand implements iCommand {
  constructor() {
    super(undefined, { name: "ct", description: "just a description" });
    this._cmd = new Command()
      .name("ct")
      .description("commercetools cli")
      .version(build.version)
      .option("-i, --interactive", "run interactive")
      .action(function ({ interactive }) {
        if (!interactive) this.showHelp();
      });
  }

  async action() {
    if (CommandMain.interactive) await this.run();
    else this._cmd.showHelp();
  }
}
