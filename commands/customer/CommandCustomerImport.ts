import { importRandomCustomers } from "../../helpers/customers/importcustomers.ts";
import { baseCommand, iCommand } from "./../baseCommand.ts";
import { prompt, Number } from "https://deno.land/x/cliffy/prompt/mod.ts";
import { colors } from "https://deno.land/x/cliffy/ansi/colors.ts";

export class CommandCustomerImport extends baseCommand implements iCommand {
  constructor(parent: iCommand) {
    super(parent, {
      name: "import",
      description: "Import a list of random customers",
    });
    this._cmd?.arguments("<count>");
  }

  async action() {
    if (this.interactive) {
      const result = await prompt([{
        name: "count",
        message: "How many customers do you wan to import?",
        type: Number,
        min: 1,
        max: 100,
        suggestions: ["20"],
      }]);
      console.log(`Importing ${result.count} customers`);
      await importRandomCustomers(result.count);
    } else {
      try {
        const count = parseInt(this._cmd.getRawArgs()[0]);
        if (isNaN(count)) throw new Error("count should be a number");
        if (count < 2) throw new Error("Count should be bigger then 1");
        if (count > 100) throw new Error("Count should not be bigger then 100");
        await importRandomCustomers(count);
      } catch (_error) {
        console.log(colors.red(_error.message));
      }
    }

    this.next();
  }
}
