
import { project } from "../../helpers/project/project.ts";
import { baseCommand, iCommand } from "./../baseCommand.ts";
import { view } from "../view.ts"
import flags from "./countryflags.json" assert { type: "json" };

interface iCountry {
  code: {
    name: string;
    emoji: string;
    unicode: string;
    image: string;
  };
}

function countries(ccode: string[]): string {
  const response = ccode.map((country: string) => {
    return country + " " + flags[country].name + "\n";
  });

  return response.join("").slice(0, -1); // remove last newline from string
}

export class CommandProjectList extends baseCommand implements iCommand {
  constructor(parent: iCommand) {
    super(parent, {
      name: "list",
      description: "Show the details of the project",
    });
  }

  async action() {
    await this.listProject();
    this.next();
  }

  async listProject() {
    const projectdetails = await project()
    await view.render('project.view', {project: projectdetails}, "project")

  }
}
