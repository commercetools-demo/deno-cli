import {Command} from "https://deno.land/x/cliffy/command/mod.ts";
import { Select } from "https://deno.land/x/cliffy/prompt/mod.ts";

export interface iCommand {
  action(): void;
  command(): Command;
  name: string;
  description: string;
}

export interface iGlobals {
  language: string;
  country: string;
  store: string | undefined;
}

function isFunction(functionToCheck: any) {
  return functionToCheck &&
    {}.toString.call(functionToCheck) === "[object Function]";
}



export abstract class baseCommand implements iCommand {
  //protected _cmdparent: Command
  protected _cmd: Command;
  protected _parent!: iCommand;
  static global_interactive = false;

  static globals: iGlobals | undefined = undefined;

  private commands: iCommand[] = [];

  static get interactive(): boolean {
    return baseCommand.global_interactive;
  }

  static set interactive(i: boolean) {
    baseCommand.global_interactive = true;
  }

  get interactive(): boolean {
    return baseCommand.global_interactive;
  }

  get name(): string {
    return this._cmd!.getName();
  }

  get description(): string {
    return this._cmd!.getDescription();
  }

  private initGlobals() {
    try {
      baseCommand.globals = JSON.parse(Deno.readTextFileSync("./globals.json"));
    } catch (error) {
      console.log("no stored globals found, using defaults");
      baseCommand.globals = {
        country: "GB",
        language: "en-GB",
        store: undefined,
      };
    }
  }

  constructor(
    parent: iCommand | undefined,
    details: { name: string, description: string, arguments?: string, option?: {flag: string, help: string, additional?: string} },
  ) {
    if (baseCommand.globals === undefined) this.initGlobals();
    if (parent === undefined) return; // only to accomodate a rootcommand
    this._parent = parent;
    //this._cmdparent = parent.command()
    this._cmd = new Command()
      .name(details.name)
      .description(details.description)
      .arguments(details.arguments!)
      
      .action(() => this.action())
    if (details.option !== undefined) this._cmd.option(details.option!.flag, details.option!.help)
    this._parent.command().command(this._cmd.getName(), this._cmd);
  }

  abstract action(): void;

  command(): Command {
    return this._cmd!;
  }

  promptOption(): { name: string; value: string } {
    const prompt: { name: string; value: string } = {
      name: this._cmd!.getName(),
      value: this._cmd!.getName(),
    };
    return prompt;
  }

  getSubcommands() {
    const commands = this._cmd!.getCommands();
    commands.forEach((command) => {
      console.log(command.getName());
    });
  }

  async start() {
    const { options } = await this._cmd!.parse(Deno.args);
    if (options.interactive) {
      baseCommand.interactive = true;
      console.log(
        `running interactive with language: ${baseCommand.globals.language}, country: ${baseCommand.globals.country} store: ${baseCommand.globals.store}`,
      );
      await this.run();
    }
  }

  next() {
    if (this._parent === undefined) Deno.exit(0);
    if (this.interactive) this._parent.action();
  }

  async run() {
    if (!this.interactive) return;
    const action = await this.prompt();
    await this.runCommand(action);
  }

  public add(command: iCommand) {
    this.commands.push(command);
  }

  getPrompts(): { name: string; value: string }[] {
    //const commands = this._cmd!.getCommands()
    const prompt: { name: string; value: string }[] = [];
    for (const command of this.commands) {
      prompt.push({ name: command.name, value: command.name });
    }
    if (this._parent === undefined) {
      prompt.push({ name: "exit", value: "exit" });
    } else prompt.push({ name: "back", value: "back" });
    return prompt;
  }

  async runCommand(name: string) {
    // deno-lint-ignore no-explicit-any
    let exec: any = undefined;
    for (const command of this.commands) {
      if (command.name === name) {
        exec = command.action();
        break;
      }
    }
    if (name === "back") {
      if (this._parent === undefined) Deno.exit();
      exec = this._parent.action();
    }
    if (isFunction(exec)) {
      const result = await exec();
    }
  }

  async prompt(): Promise<string> {
    const cmd: string = await Select.prompt({
      message: "Pick a command",
      options: this.getPrompts(),
    });
    return cmd;
  }
}
