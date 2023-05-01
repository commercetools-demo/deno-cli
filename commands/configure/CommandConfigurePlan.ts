import { baseCommand, iCommand } from "./../baseCommand.ts";

export class CommandConfigurePlan extends baseCommand implements iCommand {
  constructor(parent: iCommand) {
    super(parent, { name: "plan", description: "Plan a configuration" });
  }

  async action() {
    console.log("action from plan command");
    await this.ExecTerraformPlan();
    this.next();
  }

  private async ExecTerraformPlan() {
    const cmd = ["terraform", "plan"];
    const p = Deno.run({ cmd }); // create subprocess
    await p.status(); // await its completion
  }
}
