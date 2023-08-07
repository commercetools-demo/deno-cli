import { Command } from "https://deno.land/x/cliffy/command/command.ts";
import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";


await new Command()
  .name("checkout cart from web")
  .version("0.1.0")
  .description("checkout a cart from web");

console.log(`checkout cart from web`);

const handle = sdk.init();
const cart = await handle
  .root()
  .carts()
  .post({
    body: {
      currency: "EUR",
      lineItems: [
        {
          sku: "simple-product-yellow",
          quantity: 1,
        },
      ],

      customerId: "1d43c7c0-ad41-4306-9481-cc956b3fa36d",
      custom: {
        type: {
          key: "appchannel",
          typeId: "type",
        },
        fields: {
          channel: "web",
        },
      },
      discountCodes: ["mysterie"],
      shippingMode: "Single",
      shippingAddress: { country: "NL" },
    },
  })
  .execute();
console.log(cart.body);

const cartversion = cart.body.version;
const cartid = cart.body.id;

const order = await handle
  .root()
  .orders()
  .post({
    body: {
      version: cartversion,
      cart: {
        id: cartid,
        typeId: "cart",
      },
      orderNumber: "usecase2 web " + Math.round(Math.random() * 1000),
    },
  })
  .execute();

console.log(`order created with web, with id: ${order.body.id}`);
