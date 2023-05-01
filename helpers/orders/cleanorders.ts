import { sdk } from "../../deps.ts"
import { cleanorders } from "../clean/cleanorders.ts";

const handle = await sdk.init();
await cleanorders(handle!);
console.log("the project is now without any orders");
