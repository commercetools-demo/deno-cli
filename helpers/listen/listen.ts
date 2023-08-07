import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

async function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function messages(handle: sdk, limit=500) {
  const result = await handle
    .root()
    .messages()
    .get({queryArgs: {limit: limit}})
    .execute();
  return result;
}

async function enableMessages(handle: sdk) {
  const currentproject = await handle
    .root()
    .get()
    .execute();
  if (!currentproject.body.messages.enabled) {
    const newproject = await handle
      .root()
      .post({
        body: {
          actions: [{
            action: "changeMessagesConfiguration",
            messagesConfiguration: {
              enabled: true,
              deleteDaysAfterCreation: 1,
            },
          }],
          version: currentproject.body.version,
        },
      })
      .execute();
  }
}

async function disableMessages(handle: sdk) {
  const currentproject = await handle
    .root()
    .get()
    .execute();
  if (!currentproject.body.messages.enabled) {
    const newproject = await handle
      .root()
      .post({
        body: {
          actions: [{
            action: "changeMessagesConfiguration",
            messagesConfiguration: {
              enabled: false,
              deleteDaysAfterCreation: 1,
            },
          }],
          version: currentproject.body.version,
        },
      })
      .execute();
  }
}

async function getStateByID(handle: sdk, id: string) {
  const state = await handle
    .root()
    .states()
    .withId({ID: id})
    .get()
    .execute()
  return state.body
}

const handle = sdk.init();
await enableMessages(handle);
const starting = await messages(handle);
let msgCount = starting.body.total;
console.log(`we have ${msgCount} messages in queue`);
while (1) {
  const allMessages = await messages(handle, 500);
  if (allMessages.body.total > msgCount) { // we have something new!
    const latest = allMessages.body.results.slice(msgCount - allMessages.body.total);
    for (const msg of latest) {
      let state = undefined
      if (msg.state !== undefined) state = await getStateByID(handle, msg.state.id)
      console.log(`type: ${msg.type} s#: ${msg.sequenceNumber} ${(state) ? "state: " + state.key : ""}` );
      //console.log(JSON.stringify(msg, null, 3))
    }
    msgCount = allMessages.body.total;
  }
  //console.log(await messages(handle))
  await (timeout(1000));
}
await disableMessages(handle);
