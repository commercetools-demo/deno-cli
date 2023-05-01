import { sdk, iConfig } from "../../deps.ts";

export abstract class baseModel {
  constructor(){
    console.log(`baseModel::contructor`)
  }

  abstract get(): any
}

export class clientModel extends baseModel{
  constructor(){
    super()
  }

  get(): iConfig {
      const handle = sdk.init()
      return handle.config
  }
}

