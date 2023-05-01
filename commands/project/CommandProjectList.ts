import { project } from "../../helpers/project/project.ts";
import { baseCommand, iCommand } from "./../baseCommand.ts";
import { view } from "../view.ts"

export class CommandProjectList extends baseCommand implements iCommand {
  constructor(parent: iCommand) {
    super(parent, {
      name: "list",
      description: "Show the details of the project",
    });
  }

  async action() {
    const projectdetails = await project()
    await view.render('project.view', {project: projectdetails}, "project")
    this.next();
  }
}
