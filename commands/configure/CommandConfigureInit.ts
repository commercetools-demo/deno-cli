import { prompt, Select, Confirm } from "https://deno.land/x/cliffy/prompt/mod.ts";
import { baseCommand, iCommand } from "./../baseCommand.ts";

const configBaseURL =
  `https://raw.githubusercontent.com/commercetools-demo/terraform-commercetools-demoprovisioner/master/examples`;

export class CommandConfigureInit extends baseCommand implements iCommand {
  constructor(parent: iCommand) {
    super(parent, {
      name: "init",
      description: "Initialise the configuration",
    });
    this._cmd?.arguments("<region>");
    this._cmd?.help("Allowed regions are: EMEA, APAC or US");
  }

  async action() {
    console.log("action from configure init");
    if (this.interactive) {
      const result = await this.interactivePrompt();
      console.log(result);
      this.next();
    }
  }

  private async interactivePrompt() {
    const result = await prompt([
      {
        name: "region",
        message: "What region template do you want to deploy",
        type: Select,
        options: ["EMEA", "APAC", "US"],
      },
      {
        name: "check",
        message:
          "Are you sure you want to initialize your project? (Will remove all cache settings)",
        type: Confirm,
        before: async ({ region }, next) => {
          await console.log(`fetching config for region: ${region}`);
          await this.DownloadFiles(region!);
          await next();
        },
        after: async ({ check }, next) => { // executed after check prompt
          if (check) {
            console.log("running terraform init");
            await this.ExecTerraformInit();
            await next();
          } else {
            await next(); // run like prompt again
          }
        },
      },
    ]);
    return result;
  }

  private async DownloadFiles(region: string) {
    await this.DownloadConfigFromRegion(region);
    await this.DownloadMainTfFromRegion(region);
    await this.DownloadSimpleProductTfFromRegion(region);
  }

  private async ExecTerraformInit() {
    const cmd = ["terraform", "init"];
    const p = Deno.run({ cmd }); // create subprocess
    await p.status(); // await its completion
  }

  private async DownloadSimpleProductTfFromRegion(region: string) {
    const filename = `simpleProduct.tf`;
    const fileurl = `${configBaseURL}/${region}/${filename}`;
    const handle = await fetch(fileurl);
    const content = await handle.text();
    Deno.writeTextFileSync(`./${filename}`, content);
  }

  private async DownloadMainTfFromRegion(region: string) {
    const filename = `main.tf`;
    const fileurl = `${configBaseURL}/${region}/${filename}`;
    const handle = await fetch(fileurl);
    const content = await handle.text();
    Deno.writeTextFileSync(`./${filename}`, content);
  }

  private async DownloadConfigFromRegion(region: string) {
    const configfilename = `ct-config-${region?.toLowerCase()}.yml`;
    const fileurl = `${configBaseURL}/${region}/${configfilename}`;
    const handle = await fetch(fileurl);
    const content = await handle.text();
    Deno.writeTextFileSync(`./${configfilename}`, content);
  }
}
