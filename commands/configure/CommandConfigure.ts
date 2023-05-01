import { baseCommand, iCommand } from "./../baseCommand.ts";
import { CommandConfigureInit } from "./CommandConfigureInit.ts";
import { CommandConfigurePlan } from "./CommandConfigurePlan.ts";
import { CommandConfigureApply } from "./CommandConfigureApply.ts";
import { CommandConfigureClean } from "./CommandConfigureClean.ts";

export class CommandConfigure extends baseCommand implements iCommand {
  constructor(parent: iCommand) {
    super(parent, {
      name: "configure",
      description: "Configure your project with the right setttings",
    });
    this.add(new CommandConfigureInit(this));
    this.add(new CommandConfigurePlan(this));
    this.add(new CommandConfigureApply(this));
    this.add(new CommandConfigureClean(this));
  }

  action() {
    this.run();
  }
}
