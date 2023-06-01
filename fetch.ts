const loc = "https://deno.land/x/commercetools_demo_cli/views/client/client.view.njk"

function get(url: string): Promise<string> {
  return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.text()
    })
}


get(loc).then((message) =>
{
  console.log(message)
})