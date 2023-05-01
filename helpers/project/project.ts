import { Project, sdk } from "../../deps.ts";

export async function project(): Promise<Project> {
  const handle = await sdk.init();
  const projectKey = handle.projectKey;
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
    .get()
    .execute();
  return result.body;
}
