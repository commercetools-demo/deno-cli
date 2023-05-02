import { Command } from "../deps.ts";
import { baseCommand, iCommand } from "./baseCommand.ts";
import * as path from "https://deno.land/std@0.138.0/path/mod.ts";

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

  getModuleDir(importMeta: ImportMeta): string {
    return path.resolve(path.dirname(path.fromFileUrl(importMeta.url)));
  }
  
  version() {
    const dir = this.getModuleDir(import.meta);
    console.log(dir);
    const version = Deno.readTextFileSync("version.txt")
    return version
  }
}
