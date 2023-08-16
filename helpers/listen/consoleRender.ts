import { Message, sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";
import { iMessageHandler } from "./listen.ts";
import { tty } from "https://deno.land/x/cliffy/ansi/tty.ts";

export class consoleRender implements iMessageHandler {
   handle(messages: Message[]): void {
      //console.log(JSON.stringify(data, null, 3))

      for (const msg of messages) {
         tty.bel
         console.log(`v: ${msg.version} r: ${msg.resourceVersion} t: ${msg.type}`)
      }
   }

   private async getStateByID(id: string) {
      const handle = sdk.init()
      const state = await handle
         .root()
         .states()
         .withId({ ID: id })
         .get()
         .execute()
      return state.body
   }
}