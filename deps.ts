/**
 * deps.ts
 *
 * This module re-exports all the required modules
 */
export {
  Command,
  CompletionsCommand,
} from "https://deno.land/x/cliffy/command/mod.ts";

export {
  Confirm,
  Number,
  prompt,
  Select,
} from "https://deno.land/x/cliffy/prompt/mod.ts";
export type { SelectValueOptions } from "https://deno.land/x/cliffy/prompt/mod.ts";
export { Cell, Row, Table } from "https://deno.land/x/cliffy/table/mod.ts";

export { colors } from "https://deno.land/x/cliffy/ansi/colors.ts";
export { importsdk } from "https://deno.land/x/commercetools_demo_sdk/importsdk.ts";
export type {
  CustomerImport,
  ProductImport,
  ImportContainer,
  ImportOperation,
  ImportOperationStatus,
} from "https://deno.land/x/commercetools_demo_sdk/importsdk.ts";
export { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";
export type {
  iConfig,
  Address,
  Customer,
  ProductVariant,
  Project,
  Price,
  Order,
  Cart
} from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";
export { dateToString } from "https://deno.land/x/date_format_deno/mod.ts";
import nunjucks from "npm:nunjucks"
export {nunjucks} 
export {
  SpinnerTypes,
  TerminalSpinner,
} from "https://deno.land/x/spinners/mod.ts";

export enum ctcolor {
  GREEN = 0xff32D3BC,
  BLUE = 0xff3FA0EA,
  YELLOW = 0xffFFD00A,
  ORANGE = 0xffFF761C,
  GRAY = 0xffEFEFEF,
  TEAL = 0xff003037,
}
