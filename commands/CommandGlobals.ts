import { prompt, Select } from "https://deno.land/x/cliffy/prompt/mod.ts";
import { colors } from "https://deno.land/x/cliffy/ansi/colors.ts";
import { project } from "../helpers/project/project.ts";
import { storesAll } from "../helpers/stores/stores.ts";
import { baseCommand, iCommand } from "./baseCommand.ts";

export class CommandGlobals extends baseCommand implements iCommand {
  constructor(parent: iCommand) {
    super(parent, {
      name: "globals",
      description: "Set global variables like langguage and country",
    });
  }

  async action() {
    console.log(colors.blue("action from globals"));
    const projectdetails = await project();
    const stores = await storesAll();
    const storeslist = [];
    for (const store of stores) {
      storeslist.push({ name: store.key, value: store.key });
    }
    if (CommandGlobals.interactive) {
      const globalsSelector = await prompt([{
        name: "language",
        message: "Select a default language",
        default: CommandGlobals.globals?.language,
        type: Select,
        options: projectdetails.languages,
        after: async ({ language }, next) => { // executed after like prompt
          if (projectdetails.countries.length) {
            await next(); // run age prompt
          } else {
            if (storeslist.length) {
              await next("store"); // run age prompt
            }
          }
        },
      }, {
        name: "country",
        message: "Select a default country",
        default: CommandGlobals.globals?.country,
        type: Select,
        options: projectdetails.countries,
        after: async ({ store }, next) => { // executed after like prompt
          if (storeslist.length) {
            await next("store"); // run age prompt
          }
        },
      }, {
        name: "store",
        message: "Select a default store",
        default: CommandGlobals.globals?.store,
        type: Select,
        options: storeslist,
      }]);
      console.log(`saving globals to file`);
      Deno.writeTextFileSync(
        "./globals.json",
        JSON.stringify(globalsSelector, null, 3),
      );
      console.log(`selected: ${JSON.stringify(globalsSelector)}`);
    }
    this.next();
  }
}
