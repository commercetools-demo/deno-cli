import { Confirm } from "https://deno.land/x/cliffy/prompt/mod.ts";
import { baseCommand, iCommand } from "../baseCommand.ts";

export class CommandConfigureApply extends baseCommand implements iCommand {
  constructor(parent: iCommand) {
    super(parent, { name: "apply", description: "Apply a configuration" });
  }

  async action() {
    let confirmed = true;
    if (this.interactive) {
      confirmed = await Confirm.prompt("Can you confirm?");
    }
    if (confirmed) await this.ExecTerraformApply();
    console.log("action from apply command");
    this.next();
  }

  private async ExecTerraformApply() {
    const cmd = ["terraform", "apply", "-auto-approve"];
    const p = Deno.run({ cmd }); // create subprocess
    await p.status(); // await its completion
  }
}
