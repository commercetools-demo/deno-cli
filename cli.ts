import { CommandClient } from "./commands/CommandClient.ts";
import { CommandMain } from "./commands/CommandMain.ts";
import { CommandProject } from "./commands/project/CommandProject.ts";
import { CommandProduct } from "./commands/product/CommandProduct.ts";
import { CommandConfigure } from "./commands/configure/CommandConfigure.ts";
import { colors } from "./deps.ts";
import { sdk } from "./deps.ts";
import { CommandGlobals } from "./commands/CommandGlobals.ts";
import { CommandCustomer } from "./commands/customer/CommandCustomer.ts";

const commander = new CommandMain();
commander.add(new CommandClient(commander));
commander.add(new CommandProject(commander));
commander.add(new CommandProduct(commander));
commander.add(new CommandCustomer(commander));
commander.add(new CommandConfigure(commander));
commander.add(new CommandGlobals(commander));

const handle = sdk.init();
console.log(
  colors.brightBlue(
    `commercetools cli for project ${colors.bold.blue(handle.projectKey)}`,
  ),
);

await commander.start();
