import { sdk, State } from "./../../deps.ts";

export async function cleanstates(handle: sdk) {
  const projectKey = handle.projectKey;
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
    .states()
    .get()
    .execute();
  const stateslist = result.body.results;
  if (!stateslist.length) console.log(`No states to delete`);
  stateslist.map(async (state: State) => {
    if (state.builtIn) return;
    if (state.transitions?.length === 0) return;
    console.log(
      `Removing transitions from state ${state.key} with ID: ${state.id}`,
    );
    await handle
      .apiRoot()
      .withProjectKey({ projectKey })
      .states()
      .withKey({ key: state.key })
      .post(
        {
          body: {
            version: state.version,
            actions: [
              {
                action: "setTransitions",
                transitions: [],
              },
            ],
          },
        },
      )
      .execute();
  });
  const resetresult = await handle
    .apiRoot()
    .withProjectKey({ projectKey })
    .states()
    .get()
    .execute();
  const resetstateslist = resetresult.body.results;
  resetstateslist.map(async (state: State) => {
    if (state.builtIn) return;
    console.log(`Deleting state ${state.key} with ID: ${state.id}`);
    await handle
      .apiRoot()
      .withProjectKey({ projectKey })
      .states()
      .withKey({ key: state.key })
      .delete({ queryArgs: { version: state.version } })
      .execute();
  });
}
