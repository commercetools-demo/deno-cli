import { Cell, Row, Table } from "https://deno.land/x/cliffy/table/mod.ts";
import { prompt, Select } from "https://deno.land/x/cliffy/prompt/mod.ts";
import { colors } from "https://deno.land/x/cliffy/ansi/colors.ts";
import { dateToString } from "https://deno.land/x/date_format_deno/mod.ts";
import {  Address, Customer, } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";
import { listCustomers } from "../../helpers/customers/list.ts";
import { customerDetails } from "../../helpers/customers/details.ts";
import { baseCommand, iCommand } from "./../baseCommand.ts";

export class CommandCustomerList extends baseCommand implements iCommand {
  constructor(parent: iCommand) {
    super(parent, { name: "list", description: "list all customers" });
  }

  async action() {
    if (this.interactive) {
      console.log("running customer list interactive");
      const customerID = await this.pagedList(0, 10);
      await this.customerDetails(customerID);
      this.next();
    } else {
      const list = await listCustomers(0, 100);
      console.log(`found ${list.body.total} customers`);
      const table = new Table();
      table.header([
        colors.bold("#"),
        colors.bold("Firstname"),
        colors.bold("Lastname"),
        colors.bold("e-mail"),
      ]);
      let index = 1;
      for (const customer of list.body.results) {
        table.push([
          index++,
          customer.firstName,
          customer.lastName,
          customer.email,
        ]);
      }
      table.render();
      this.next();
    }
  }

  async pagedList(start = 0, limit = 20): Promise<string> {
    let selected = "";
    const list = await listCustomers(start, limit);
    const offset = list.body.offset;
    const count = list.body.count;
    const total = list.body.total!;
    const options = [];
    if (offset > 0) options.push({ name: "< prev", value: "prev" });
    let index = offset + 1;
    for (const customer of (await list).body.results) {
      options.push({
        name:
          `${index} ${customer.firstName} ${customer.lastName} ${customer.email}`,
        value: customer.id,
      });
      index++;
    }
    if (offset + count < total) options.push({ name: "> next", value: "next" });
    options.push(Select.separator("--------"));
    options.push("back");
    const selector = await prompt([{
      name: "customer",
      message: "Select a customer for more details",
      type: Select,
      options: options,
    }]);
    switch (selector.customer) {
      case "next":
        selected = await this.pagedList(offset + count, limit);
        break;
      case "prev":
        selected = await this.pagedList(offset - count, limit);
        break;
      case "back":
        selected = "";
        break;
      default:
        selected = selector.customer!;
    }
    return selected;
  }

  heading(title: string): string {
    return colors.blue.bold(title);
  }

  date(datestring: string, asdate = false): string {
    if (asdate) return dateToString("dd-MM-yyyy", new Date(datestring));
    return dateToString("dd-MM-yyyy hh:mm:ss", new Date(datestring));
  }

  address(addr: Address) {
    const ad =
      `${addr.streetName} ${addr.streetNumber} ${addr.postalCode} ${addr.city} ${addr.country}`;
    return ad;
  }

  adresses(adresses: Address[], table: Table) {
    let index = 1;
    for (const addr of adresses) {
      const row = new Row();
      const heading = new Cell(this.heading(`address`)).rowSpan(3);
      const addrnr = new Cell(this.heading(index++ + "")).rowSpan(3);
      const addrcell = new Cell(this.address(addr));
      const contactcell = new Cell(this.heading("contact"));
      row.push(heading);
      row.push(addrnr);
      row.push(addrcell);
      row.push(contactcell);
      table.push(row);
      //table.push([this.heading("contact")])
    }
  }

  customerBasics(customer: Customer, table: Table) {
    //table.push([new Cell(JSON.stringify(customer, null, 3)).colSpan(4)])
    table.push([
      this.heading("Name"),
      `${customer.title} ${customer.firstName} ${customer.lastName}`,
    ]);
    table.push([this.heading("key"), customer.key!]);
    table.push([this.heading("email"), customer.email]);
    table.push([this.heading("id"), customer.id]);
    table.push([this.heading("external id"), customer.externalId!]);
    table.push([
      this.heading("birthdate"),
      this.date(customer.dateOfBirth!, true),
    ]);
    table.push([this.heading("Version"), customer.version]);
    table.push([this.heading("created at:"), this.date(customer.createdAt)]);
    table.push([
      this.heading("modified at:"),
      this.date(customer.lastModifiedAt),
    ]);
  }

  async customerDetails(id: string) {
    const customer = await customerDetails(id);
    const table = new Table();
    this.customerBasics(customer, table);
    this.adresses(customer.addresses, table);
    table.border(true);
    table.padding(0);
    table.render();
  }
}
