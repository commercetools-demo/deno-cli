import { Project, sdk } from "../../deps.ts";

export async function project(): Promise<Project> {
  const res = await new ProjectModel().get()
  //console.log(res)
  return res
  try {
    const handle = sdk.init();
    const result = await handle
      .apiRoot()
      .withProjectKey({ projectKey: handle.projectKey })
      .get()
      .execute();
    return result.body;
  }
  catch (_error) {
    return undefined
  }
}

abstract class baseModel<T>  {
  private handle!: sdk; 
  protected root: any
  constructor() {
    //console.log('abstract model constructor')
    this.handle = sdk.init()
    this.root = this.handle
      .apiRoot()
      .withProjectKey({ projectKey: this.handle.projectKey })
  }

  abstract get(): Promise<T> 
}

class ProjectModel<T> extends baseModel<T> {
  
  async get(): Promise<Project> {
    try {
      const result = await this.root
        .get()
        .execute()
      return result.body
    }
    catch (_error) {
      return undefined
    }
  }
}