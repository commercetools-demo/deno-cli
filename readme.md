# commercetools cli

### A commercetools command line interface using Deno

how to run:

`deno run -A https://deno.land/x/commercetools_demo_cli/cli.ts -i` this runs the command for you.

or install it as a command line function:

`deno install -A https://deno.land/x/commercetools_demo_cli/cli.ts`

this allows you to run:

- `ct -i` run the interactive cli
- `ct --help` get some help, notice each command has it's own related help

_**Prerequisites**_

- have the [deno](https://deno.land/manual/getting_started/installation) runtime
  installed
- have [terraform](https://developer.hashicorp.com/terraform/downloads)
  installed
- have a
  [.env](https://docs.commercetools.com/merchant-center/api-clients#create-an-api-client)
  file containing the details of your commeretools project

_**commands**_

- `client` Shows the configuration of the API client
- `project` Information arround the configuration of the project
  - `list` Lists the configuration of the project
  - `clean` Deletes all configuration in the project, be carefull, it removes
    everything!

- `product` Gets products from the project
  - `list` Lists all products in the project
  - `import` Imports a selection of products into the project. For now a rubber
    duck with 7 variants
  - `clean` Deletes all products from the project
  - `publish` Publish a modified on unpublished product
- `customer` Work with the customer entity
  - `list` list all customers in the project
  - `import <region> <count>` import a number of random customers into the
    project.
- `configure` configure your project with the right settings
  - `init <region>` Initialise the configuration with countries, languages,
    zones, channels, tax-rates, shipping methods, channels and stores. Allowed
    regions are: EMEA, APAC or US
  - `plan` this is just an alias for the terraform plan command
  - `apply` this is just an alias for the terraform apply command, be carefull,
    this will overwrite all in your project
  - `clean` this will remove all cached terraform information, so gives you a
    clean slate to start over again. Be carefull, you will loose state with
    terraform aswell!
- `globals` Set a number of global parameters to make working with languages,
  countries and stores a bit easier

  _**history:**_
  - 1-05-2023 first release
