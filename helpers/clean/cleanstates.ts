import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export async function cleanstates(handle: sdk) {
  const result = await handle
    .root()
    .states()
    .get()
    .execute();
  const stateslist = result.body.results;
  if (!stateslist.length) console.log(`No states to delete`);
  for (const state of stateslist) {
    if (state.transitions?.length === 0) continue;
    console.log(`Removing transitions from state ${state.key} with ID: ${state.id}`);
    await handle
      .root()
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
  }
  const resetresult = await handle
    .root()
    .states()
    .get()
    .execute();
  const resetstateslist = resetresult.body.results;
  for (const state of resetstateslist) {
    if (state.builtIn) continue;
    console.log(`Deleting state ${state.key} with ID: ${state.id}`);
    await handle
      .root()
      .states()
      .withKey({ key: state.key })
      .delete({ queryArgs: { version: state.version } })
      .execute();
  } 
}
