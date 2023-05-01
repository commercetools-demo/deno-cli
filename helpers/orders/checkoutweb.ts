import { Command, sdk } from "../../deps.ts"


await new Command()
  .name("checkout cart from web")
  .version("0.1.0")
  .description("checkout a cart from web");

console.log(`checkout cart from web`);

const handle = sdk.init();
const projectKey = handle.projectKey;
const cart = await handle
  .apiRoot()
  .withProjectKey({ projectKey })
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
  .apiRoot()
  .withProjectKey({ projectKey })
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
