import { colors, nunjucks, ctcolor } from "../deps.ts";
import dayjs from "npm:dayjs";

export class view {
  static templateEngine(searchpath: string): nunjucks.Environment {
    return new nunjucks.Environment(denoLoader.init(searchpath))
  }

  private static renderengine(name: string, context: any, searchpath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const env = view.templateEngine(searchpath)
      env.addFilter("date", (date, format) => dayjsFilter(date, format))
      //env.addFilter("table", (value) => table(value))
      env.addFilter("color", (value: string, color: ctcolor) => colorFilter(value, color))
      env.addFilter("keyPair", (key: string, value: any) => keyPair(key, value))
      env.addFilter("boolPair", (key: string, value: any) => boolPair(key, value))
      env.addFilter("datePair", (key: string, value: any, format: string) => datePair(key, value, format))
      env.render(name, context, function (err, res: string | null) {
        if (err) return reject(err)
        resolve(res!)
      })
    })
  }
  static async render(templateName: string, data: any, commandname = "") {
    if (data === undefined) return
    const filename = `${templateName}.njk`
    let path = ""
    if (commandname !== "") {
      //const __dirname = new URL('.', import.meta.url).pathname;
      path = `./views/${commandname}/`
      //path = `${__dirname}/${commandname}/`
    }
    const myview = await view.renderengine(filename, data, path)
    console.log(myview)
  }
}

class denoLoader extends nunjucks.Loader implements nunjucks.ILoader {
  private path = ""
  async = true

  static init(searchPaths?: string | string[]): denoLoader {
    const loader = new denoLoader()
    loader.path = (Array.isArray(searchPaths)) ? searchPaths!.toString() : searchPaths!
    return loader
  }

  getSource(name: string, callback: nunjucks.Callback<Error, nunjucks.LoaderSource>): void | nunjucks.LoaderSource {
    const path = this.path + name
    
    Deno.readTextFile(path).then((data) => {
      callback(null, {
        src: data,
        path,
        noCache: true,
      })
    })
  }
}


/* defaultFormat could be any other valid dayjs format,
 * or null, in which case we’d get dayjs().format() */
const defaultFormat = 'DD MMM YYYY'

function dayjsFilter(date: string, format = defaultFormat) {
  return dayjs(date).format(format)
}

function colorFilter(value: string, color: ctcolor) {
  const col: ctcolor = ctcolor[color as unknown as keyof typeof ctcolor]
  return colors.rgb24(value, col )
}

function keyPair(key: string, value: any) {
  return `${colors.bold(key)}: ${colors.blue(value[key] + "")}`
}

function boolPair(key: string, value: any) {
  return `${colors.bold(key)}: ${colors.blue((value[key] === true) ? "enabled" : "disabled")}`
}

function datePair(key: string, value: any, format = defaultFormat) {
  return `${colors.bold(key)}: ${colors.blue(dayjsFilter(value[key] + "", format))}`
}

