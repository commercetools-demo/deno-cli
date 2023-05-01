#!/usr/bin/env -S deno run --allow-all
import { Command } from "./deps.ts";

const FILENAME = "./version.txt"

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
  try {
    rawversion = Deno.readTextFileSync(FILENAME)
  }
  catch (_error) {
    rawversion = `v0.0.0`
  }
  const v: iDetailVersion = {prefix: "", major: 0, minor: 0, patch: 0}
  const hasPrefix = !isCharNumber(rawversion[0])
  const prefix = (hasPrefix) ? rawversion[0] : ""
  const withoutPrefix = (hasPrefix) ? rawversion.slice(1): rawversion
  const vArray = withoutPrefix.split(".")
  v.prefix = prefix
  v.major = Number(vArray[0])
  v.minor = Number(vArray[1])
  v.patch = Number(vArray[2])
  return v
}

function writeVersion(version: iDetailVersion | undefined) {
  if (version === undefined) return
  Deno.writeTextFileSync(FILENAME, versionToSting(version))
}