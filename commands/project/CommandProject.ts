import { baseCommand, iCommand } from "./../baseCommand.ts";
import { CommandProjectClean } from "./CommandProjectClean.ts";
import { CommandProjectList } from "./CommandProjectList.ts";

export class CommandProject extends baseCommand implements iCommand {
  constructor(parent: iCommand) {
    super(parent, { name: "project", description: "List and clean project" });
    this.add(new CommandProjectList(this));
    this.add(new CommandProjectClean(this));
  }

  action() {
    this.run();
  }
}
