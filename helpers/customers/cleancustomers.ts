import { sdk } from "../../deps.ts";

import { cleancustomers } from "./../clean/cleancustomers.ts";

const handle = await sdk.init();
await cleancustomers(handle!);
console.log("the project is now without any customers");
