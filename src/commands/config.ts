import { editConfigList, getConfig, setConfig } from "../config/index.js";

const LIST_KEYS = ["excludeDirs", "excludeFirstMsg", "claudeArgs"];

export function configCommand(key?: string, value?: string, extra?: string): void {
  // ch config add|rm <listKey> <value>: edit one list entry, commas allowed
  if ((key === "add" || key === "rm") && value && extra !== undefined) {
    if (!LIST_KEYS.includes(value)) {
      console.log(`Not a list key. Use one of: ${LIST_KEYS.join(", ")}`);
      return;
    }
    const next = editConfigList(value, extra, key === "rm");
    console.log(`${value}: ${JSON.stringify(next)}`);
    return;
  }
  if (key && value) {
    setConfig(key, value);
    console.log(`Set ${key} = ${value}`);
    return;
  }

  const config = getConfig();
  console.log("\nCCH Configuration (~/.config/cch/config.json):\n");
  for (const [k, v] of Object.entries(config)) {
    console.log(`  ${k}: ${JSON.stringify(v)}`);
  }
  console.log();
}
