import { sdk } from "./../../deps.ts";

async function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function messages(handle: sdk) {
  const result = await handle
    .apiRoot()
    .withProjectKey({ projectKey: handle.projectKey })
    .messages()
    .get()
    .execute();
  return result.body;
}

async function enableMessages(handle: sdk) {
  const currentproject = await handle
    .apiRoot()
    .withProjectKey({ projectKey: handle.projectKey })
    .get()
    .execute();
  if (!currentproject.body.messages.enabled) {
    const newproject = await handle
      .apiRoot()
      .withProjectKey({ projectKey: handle.projectKey })
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
    .apiRoot()
    .withProjectKey({ projectKey: handle.projectKey })
    .get()
    .execute();
  if (!currentproject.body.messages.enabled) {
    const newproject = await handle
      .apiRoot()
      .withProjectKey({ projectKey: handle.projectKey })
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

const handle = sdk.init();
await enableMessages(handle);
const starting = await messages(handle);
let msgCount = starting.count;
console.log(`we have ${msgCount} messages in queue`);
while (1) {
  const allMessages = await messages(handle);
  if (allMessages.count > msgCount) { // we have something new!
    const latest = allMessages.results.slice(msgCount - allMessages.count);
    for (const msg of latest) {
      console.log(msg.type);
    }
    msgCount = allMessages.count;
  }
  //console.log(await messages(handle))
  await (timeout(1000));
}
await disableMessages(handle);
