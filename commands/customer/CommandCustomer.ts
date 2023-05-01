import { baseCommand, iCommand } from "../baseCommand.ts";
import { CommandCustomerList } from "./CommandCustomerList.ts";
import { CommandCustomerImport } from "./CommandCustomerImport.ts";

export class CommandCustomer extends baseCommand implements iCommand {
  constructor(parent: iCommand) {
    super(parent, {
      name: "customer",
      description: "list and import customers",
    });
    this.add(new CommandCustomerList(this));
    this.add(new CommandCustomerImport(this));
  }

  action() {
    this.run();
  }
}
