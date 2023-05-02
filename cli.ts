import { CommandClient } from "./commands/CommandClient.ts";
import { CommandMain } from "./commands/CommandMain.ts";
import { CommandProject } from "./commands/project/CommandProject.ts";
import { CommandProduct } from "./commands/product/CommandProduct.ts";
import { CommandConfigure } from "./commands/configure/CommandConfigure.ts";
import { colors, gte } from "./deps.ts";
import { sdk } from "./deps.ts";
import { CommandGlobals } from "./commands/CommandGlobals.ts";
import { CommandCustomer } from "./commands/customer/CommandCustomer.ts";
import currentversion from "./version.json" assert { type: "json" };

const MIN_DENO_VERSION = "1.25.0";

ensureMinDenoVersion()

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
await checkcliversion()

function ensureMinDenoVersion() {
  // Check that the minimum supported Deno version is being used.
  if (!gte(Deno.version.deno, MIN_DENO_VERSION)) {
    let message =
      `Deno version ${MIN_DENO_VERSION} or higher is required. Please update Deno.\n\n`;

    if (Deno.execPath().includes("homebrew")) {
      message +=
        "You seem to have installed Deno via homebrew. To update, run: `brew upgrade deno`\n";
    } else {
      message += "To update, run: `deno upgrade`\n";
    }

    console.error(message);
    Deno.exit(-1)
  }
}

async function checkcliversion() {
  const rel  = await fetch(`https://api.github.com/repos/commercetools-demo/deno-cli/releases/latest`)
  const stat = await rel.json()
  
  if (stat.tag_name !== currentversion.version) {
    console.log(
      colors.brightRed(
        `There is a newer version of the cli available: ${stat.tag_name} please update the cli with the following command:
        deno cache -r  https://deno.land/x/commercetools_demo_cli/cli.ts`,
      ),
    );
  }
}