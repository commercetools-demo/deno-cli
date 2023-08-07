import { Command, sdk } from "../../deps.ts";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const { args: [cartid, vouchercode] } = await new Command()
  .name("checkout cart")
  .version("0.1.0")
  .description("checkout a cart with a specific voucher code")
  .arguments("<cartid> <vouchercode")
  .parse(Deno.args);

console.log(
  `Finishing the cart with id ${cartid}, using vouchercode ${vouchercode}`,
);

const handle = sdk.init();
const cart = await handle
  .root()
  .carts()
  .withId({ ID: cartid })
  .get()
  .execute();
console.log(cart.body);
const cartversion = cart.body.version;

const disc_cart = await handle
  .root()
  .carts()
  .withId({ ID: cartid })
  .post({
    body: {
      version: cartversion,
      actions: [
        {
          action: "addDiscountCode",
          code: vouchercode as string,
        },
      ],
    },
  })
  .execute();

const order = await handle
  .root()
  .orders()
  .post({
    body: {
      version: disc_cart.body.version,
      cart: {
        id: cart.body.id,
        typeId: "cart",
      },
      orderNumber: "usecase1" + Math.round(Math.random() * 1000),
    },
  })
  .execute();

console.log(`order created with id: ${order.body.id}`);
console.log(order.body);
await delay(5000);
const delcartver = await handle
  .root()
  .carts()
  .withId({ ID: cart.body.id })
  .get()
  .execute();
const delcart = await handle
  .root()
  .carts()
  .withId({ ID: cart.body.id })
  .delete({ queryArgs: { version: delcartver.body.version } })
  .execute();

console.log(delcart);
