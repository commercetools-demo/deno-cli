import { Command } from "./deps.ts";

const FILENAME = "./version.json"

interface iVersion {
  version: string
}

interface iDetailVersion {
  prefix: string
  major: number
  minor: number
  patch: number
}

await new Command()
      .name("bump")
      .description("increase version number of the build")
      .option("-p, --patch", "increase the patch version")
      .option("-m, --minor", "increase the minor version")
      .option("-M, --major", "increase the major version")
      .action(function ({ patch, major, minor }) {
        if (patch !== undefined) increasePatch()
        if (minor !== undefined) increaseMinor()
        if (major !== undefined) increaseMajor()
      })
      .parse(Deno.args)

      const cmd = [ "describe", "--abbrev=0", "--tags"];
      const command = new Deno.Command("git", {
        args: [...cmd],
        stdout: "piped",
        stderr: "piped"
      })
      const { code, stdout, stderr } = await command.outputSync();
      console.log(new TextDecoder().decode(stdout));
      console.log(new TextDecoder().decode(stderr));
      console.log(code);


function increasePatch() {
  const current = readVersion()
  const next = structuredClone(current)
  next.patch++
  console.log(`increasing patch version from ${versionToSting(current)} to ${versionToSting(next)}`)
  writeVersion(next)
}

function increaseMinor() {
  const current = readVersion()
  const next = structuredClone(current)
  next.minor++
  console.log(`increasing minor version from ${versionToSting(current)} to ${versionToSting(next)}`)
  writeVersion(next)
}

function increaseMajor() {
  const current = readVersion()
  const next = structuredClone(current)
  next.major++
  console.log(`increasing major version from ${versionToSting(current)} to ${versionToSting(next)}`)
  writeVersion(next)
}

function isCharNumber(c: string | number) {
  return c >= '0' && c <= '9';
}

function versionToSting(version: iDetailVersion | undefined): string {
  if (version === undefined) return ""
  return `${version?.prefix}${version?.major}.${version?.minor}.${version?.patch}`
} 

function readVersion(): iDetailVersion | undefined {
  let rawversion = ""
  let parsedversion: iVersion = {version:"v0.0.0"}
  try {
    rawversion = Deno.readTextFileSync(FILENAME)
  }
  catch (_error) {
    rawversion = `{"version": "v0.0.0"}`
  }
  try {
    parsedversion = JSON.parse(rawversion)
  }
  catch (_error) {
    console.log(_error)
    return undefined
  }
  const v: iDetailVersion = {prefix: "", major: 0, minor: 0, patch: 0}
  const hasPrefix = !isCharNumber(parsedversion.version[0])
  const prefix = (hasPrefix) ? parsedversion.version[0] : ""
  const withoutPrefix = (hasPrefix) ? parsedversion.version.slice(1): parsedversion.version
  const vArray = withoutPrefix.split(".")
  v.prefix = prefix
  v.major = Number(vArray[0])
  v.minor = Number(vArray[1])
  v.patch = Number(vArray[2])
  return v
}

function writeVersion(version: iDetailVersion | undefined) {
  if (version === undefined) return
  const rawversion: iVersion = {version: versionToSting(version)}
  Deno.writeTextFileSync(FILENAME, JSON.stringify(rawversion))
}