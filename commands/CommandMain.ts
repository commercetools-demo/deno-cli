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
      .option("-u, --upgrade", "upgrade the cli to the latest version")
      .action(function ({ interactive, upgrade }) {
        if (upgrade) upgradeCLI()
        if (!interactive && !upgrade) this.showHelp();
      });
  }

  async action() {
    if (this.upgrade) return
    if (this.interactive) await this.run()
    else this._cmd.showHelp();
  }

  version() {
    return version.version
  }
}

async function upgradeCLI() {
  console.log("updating the cli")
  
  const command = new Deno.Command(Deno.execPath(), {
    args: ["cache","-r","https://deno.land/x/commercetools_demo_cli/cli.ts"]
  });
  const child = command.spawn();
  const status = await child.status;
  Deno.exit(status.code)
}
