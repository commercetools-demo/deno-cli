import { sdk } from "../../deps.ts"
import { cleancarts } from "../clean/cleancarts.ts";

const handle = await sdk.init();
await cleancarts(handle!);
console.log("the project is now without any carts");
