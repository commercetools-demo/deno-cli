import { keypress, KeyPressEvent } from "https://deno.land/x/cliffy/keypress/mod.ts";

export class keyPress {
   public canceled = false
   constructor() {
      //console.log(`keyPress::constructor`)
      keypress().addEventListener("keydown", this.listener)
   }

   listener = (event: KeyPressEvent) =>   {
      if (event.ctrlKey && event.key === "c") {
         this.canceled = true
         keypress().dispose();
      }
   }
}
