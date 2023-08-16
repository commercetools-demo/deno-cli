import { MessagePagedQueryResponse, sdk, Message } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";
import { keyPress } from "./keypress.ts";
import { filterMessages, resourceFilter } from "./filters.ts";

// deno-lint-ignore require-await
async function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface iMessageHandler {
  handle(data: Message[]): void
}

export class listener {
  private msgHandler: iMessageHandler
  private filter: resourceFilter[] | undefined = undefined
  constructor(msgHandler: iMessageHandler, filter?: resourceFilter[]) {
    //console.log(`listener::constructor`)
    this.msgHandler = msgHandler
    this.filter = filter
  }

  async runner() {
    await this.enableMessages()
    const keystate = new keyPress()
    let msgCount = await this.peek()
    while (!keystate.canceled) {
      const current = await this.peek()
      if (current > msgCount) {
        const newmessages = await this.getNewMessages(msgCount, current - msgCount)
        const filtered = filterMessages(newmessages.results, this.filter)
        if (filtered && filtered.length) this.msgHandler.handle(filtered)
        msgCount = current
      }
      await (timeout(1000));
    }
    await this.disableMessages()
  }

  private async enableMessages() {
    const handle = sdk.init()
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
    //console.log(`message for project ${handle.projectKey} are enabled`)
  }

  private async disableMessages() {
    const handle = sdk.init()
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
    //console.log(`message for project ${handle.projectKey} are disabled`)
  }

  private async peek(): Promise<number> {
    const handle = sdk.init()
    const ammount = await handle
      .root()
      .messages()
      .get({ queryArgs: { withTotal: true, limit: 1 } })  // get one message to get the total
      .execute()
    return ammount.body.total!
  }

  private async getNewMessages(offset: number, limit = 1): Promise<MessagePagedQueryResponse> {
    const handle = sdk.init()
    const lastmessages = await handle
      .root()
      .messages()
      .get({ queryArgs: { limit: limit, offset: offset } })
      .execute()
    return lastmessages.body
  }
}

