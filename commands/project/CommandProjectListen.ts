
import { baseCommand, iCommand } from "./../baseCommand.ts";
import { view } from "../view.ts"
import { resourceFilter, listenResources, resourceNames } from "../../helpers/listen/filters.ts";
import { consoleRender } from "../../helpers/listen/consoleRender.ts";
import { listener } from "../../helpers/listen/listen.ts";
import { Checkbox } from "https://deno.land/x/cliffy/prompt/mod.ts";

const getCommandArguments = (): string => {
  let args = ""
  for (const resource of listenResources) {
    args += `[${resource.resource}:string] `
  }
  return args
}



export class CommandProjectListen extends baseCommand implements iCommand {
  constructor(parent: iCommand) {
    super(parent, {
      name: "listen",
      description: "Listen to events emitted by your commercetools project",
      arguments: getCommandArguments(),
      option: {flag: "-v, --view=[json] [table] [minimal]", help: "how detailed do you want the output, default is json"}
    });
  }

  async action() {
    let configuredFilters:resourceFilter[] | undefined = undefined
    if (this.interactive) {
      console.log("running listen interactive");
      const filters = listenResources
      const options = [];
      for (const filter of filters) {
        options.push({
          name: filter.resource,
          value: filter.resource,
          checked: filter.enabled
        });
      }
      const filterSelector: string[] = await Checkbox.prompt({
        message: "Select the type of updates you would like to see",
        options: options,
      })
      configuredFilters = this.configureFilter(filterSelector)
    }
    else {
      console.log("not running interactive")
      const cmdargs = Deno.args.slice(2)
      if (!this.validateArguments(cmdargs)) 
      {
        console.log(`An invalid argument ${this.invalidArguments(cmdargs)} was passed`)
        Deno.exit(-1)
      }
      configuredFilters = this.configureFilter(cmdargs)
    }
    const render = new consoleRender()
    const r = new listener(render, configuredFilters)
    console.log(`listening.... press crtl+c to cancel`)
    await r.runner()
      
      //const projectdetails = await listen()
      //if (projectdetails) await view.render('project.view', { project: projectdetails }, "project")
    
    this.next();
  }

  configureFilter(selectedFilters: string[]): resourceFilter[]{
    const configuredFilters = []
    for (const filter of selectedFilters) {
      const filt: resourceFilter = {
        resource: filter,
        enabled: true
      }
      configuredFilters.push(filt)
    }
    return configuredFilters
  }

  validateArguments (args: string[]): boolean {
    return args.every((v: string) => {
      return resourceNames().includes(v)  
    })
  }

  invalidArguments( args: string[]): string[] {
    const invalid: string[] = []
    args.every((v: string) => {
      if (!resourceNames().includes(v)) invalid.push(v)
      return true
    })
    
    return invalid
  }
}
