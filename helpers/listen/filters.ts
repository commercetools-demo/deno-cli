import { Message, ReferenceTypeId } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";

export interface resourceFilter {
   resource: ReferenceTypeId
   enabled: boolean
}

export const resourceNames = (): string[] => {
   return listenResources.map((v: resourceFilter) => {
      return v.resource
   })
}

export const listenResources: resourceFilter[] = [
   {resource: 'associate-role', enabled: false},
   {resource: 'attribute-group', enabled: false},
   {resource: 'business-unit', enabled: false},
   {resource: 'cart', enabled: false},
   {resource: 'cart-discount', enabled: false},
   {resource: 'category', enabled: false},
   {resource: 'channel', enabled: false},
   {resource: 'customer', enabled: false},
   {resource: 'customer-group', enabled: false},
   {resource: 'direct-discount', enabled: false},
   {resource: 'discount-code', enabled: false},
   {resource: 'extension', enabled: false},
   {resource: 'inventory-entry', enabled: false},
   {resource: 'key-value-document', enabled: false},
   {resource: 'order', enabled: false},
   {resource: 'order-edit', enabled: false},
   {resource: 'payment', enabled: false},
   {resource: 'product', enabled: true},
   {resource: 'product-discount', enabled: false},
   {resource: 'product-price', enabled: false},
   {resource: 'product-selection', enabled: false},
   {resource: 'product-type', enabled: false},
   {resource: 'quote', enabled: false},
   {resource: 'quote-request', enabled: false},
   {resource: 'review', enabled: false},
   {resource: 'shipping-method', enabled: false},
   {resource: 'shopping-list', enabled: false},
   {resource: 'staged-quote', enabled: false},
   {resource: 'standalone-price', enabled: false},
   {resource: 'state', enabled: false},
   {resource: 'store', enabled: false},
   {resource: 'subscription', enabled: false},
   {resource: 'tax-category', enabled: false},
   {resource: 'type', enabled: false},
   {resource: 'zone', enabled: false},
]

const enabledResources = (resources: resourceFilter[]): resourceFilter[] => {
   return resources.filter((resource) => {
      resource.enabled === true
   })
}

const isEnabledResource = (name: string, tocheck: resourceFilter[]): boolean =>{
   const found = tocheck.find((obj: resourceFilter) => {
      return obj.resource === name && obj.enabled === true
   })
   return (found === undefined) ? false: true
}

export const filterMessages = (messages: Message[], filter: resourceFilter[] | undefined) => {
   if (filter === undefined) return messages
   const filtered = messages.filter((message) => {
      return isEnabledResource(message.resource.typeId, filter)
   })
   return filtered
}
