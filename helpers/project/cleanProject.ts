import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";
import {
  cleandiscountcodes,
  cleancartdiscounts,
  cleancarts,
  cleancategories,
  cleanchannels,
  cleancustomergroups,
  cleancustomers,
  cleanextensions,
  cleaninventory,
  cleanorders,
  cleanproductdiscounts,
  cleanproducts,
  cleanproductselections,
  cleanproducttypes,
  cleanproject,
  cleanshippingmethods,
  cleanstates,
  cleanstores,
  cleansubscriptions,
  cleantaxcategories,
  cleantypes,
  cleanzones,
} from "../clean/clean.ts";

export async function cleanProject() {
  const project = sdk.init();
  await cleaninventory(project);

  await cleanorders(project);
  await cleancarts(project);
  
  await cleancustomers(project);
  await cleancustomergroups(project);
  await cleandiscountcodes(project)
  await cleancartdiscounts(project);
  await cleanproductdiscounts(project);
  await cleanextensions(project);
  await cleansubscriptions(project);
  await cleanproductselections(project);
  await cleanproducts(project);
  await cleancategories(project);
  await cleanproducttypes(project);
  await cleanstores(project);
  await cleanchannels(project);
  await cleanshippingmethods(project);
  await cleantaxcategories(project);
  await cleanzones(project);
  await cleantypes(project);
  await cleanstates(project);
  await cleanproject(project);
  console.log("the project is now clean");
}
