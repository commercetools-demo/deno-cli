import { view } from "../../commands/view.ts";
import { clientModel } from "../../models/client/clientModel.ts"

export class baseController {
  protected _model: clientModel
  protected _viewTemplate: string

  constructor (model: clientModel, viewtemplate: string) {
    console.log(`clientController::contructor`)
    this._model = model
    this._viewTemplate = viewtemplate
  }

  getViewTemplate(): string {
    const path = new URL('.', import.meta.url).pathname.replace("controllers", "views")
    return `${path}${this._viewTemplate}`
  }
}

export class clientController extends baseController {
  constructor(model: clientModel, _viewTemplate: string) {
    super(model,_viewTemplate)
    this.showConfig()
  }
  
  async showConfig() {
    await view.render(this.getViewTemplate(), {config: this._model.get()})
  }
}
