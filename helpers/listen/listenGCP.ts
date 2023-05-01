import { ExistsResponse, PubSub } from "npm:@google-cloud/pubsub";
import { colors, sdk } from "../../deps.ts"

const projectId = "ct-sales-207211";
const handle = sdk.init()
const subscriptionname = `${handle.projectKey}-order-create-topic-subscription`;

async function messageHandler(message: any) {
  const data = JSON.parse(message.data.toString());
  console.log(colors.magenta("---------------------------------"));
  console.log(colors.green(`Incoming order message`));
  console.log(colors.brightGreen(`projectKey: ${data.projectKey} ${data.type}`));
  //await handleMessage(data)
  //handleTryBeforeBuy(data.order.customLineItems, data.order.id)
  console.log(colors.magenta("---------------------------------"));
  await message.ack();
}

console.log(
  colors.yellow(
    `listening for messages coming in from project ${projectId} at subscription: ${subscriptionname}`,
  ),
);
const pubSubClient = new PubSub({ projectId: projectId });
//console.log(await pubSubClient.getClientConfig());
//console.log(await pubSubClient.getTopics());
//console.log(await pubSubClient.getSubscriptions())

const subscription = pubSubClient.subscription(subscriptionname)

console.log(await subscription.exists())

/*
pubSubClient.subscription(subscriptionname).exists().then((status: ExistsResponse) => {
  console.log(status)
  if (status[0] === true) {
    const subscription = pubSubClient.subscription(subscriptionname)
    subscription.on('message', messageHandler)
  }
  else {
    console.log(colors.red(`Subscription ${subscriptionname} does not exist`))
  }

})
*/
