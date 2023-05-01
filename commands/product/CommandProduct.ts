import { baseCommand, iCommand } from "./../baseCommand.ts";
import { CommandProductClean } from "./CommandProductClean.ts";
import { CommandProductImport } from "./CommandProductImport.ts";
import { CommandProductList } from "./CommandProductList.ts";
import { CommandProductPublish } from "./publish/CommandProductPublish.ts";

export class CommandProduct extends baseCommand implements iCommand {
  constructor(parent: iCommand) {
    super(parent, { name: "product", description: "List and clean product" });
    this.add(new CommandProductList(this));
    this.add(new CommandProductClean(this));
    this.add(new CommandProductImport(this));
    this.add(new CommandProductPublish(this));
  }

  action() {
    this.run();
  }
}
