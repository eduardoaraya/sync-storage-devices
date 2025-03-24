import os from "os";
import path from "path";
import fs from "fs";

export interface IDirConfig {
  source: string[];
  output?: string;
  ignore?: string[];
}

export interface IDirecoties {
  [k: string]: IDirConfig;
}

export interface IConfigFile {
  schedule: number;
  directories?: IDirecoties;
  defaultOutput: string;
}

export const defaulConfig: IConfigFile = {
  schedule: 10000,
  defaultOutput: path.resolve(os.homedir(), "sync_directories"),
  directories: {
    documents: {
      source: [path.resolve(os.homedir(), "Documents")],
    },
    photos: {
      source: [path.resolve(os.homedir(), "Pictures")],
    },
    projects: {
      source: [path.resolve(os.homedir(), "Projects")],
    },
  },
};

const configFilePath = path.join(".sync-storage-devices.json");
let cached: IConfigFile | null = null;

export async function init(): Promise<IConfigFile> {
  if (cached) return cached;
  if (!fs.existsSync(configFilePath)) {
    await fs.writeFileSync(
      configFilePath,
      JSON.stringify(defaulConfig, null, "  ")
    );
  }
  return loadConfig();
}

export async function loadConfig(): Promise<IConfigFile> {
  if (cached) return cached;
  const content: string = (await fs.readFileSync(configFilePath)).toString(
    "utf-8"
  );
  if (!content) {
    console.error("Config file not found!");
    process.exit(1);
  }
  return (cached = JSON.parse(content) as IConfigFile);
}

export function loadDirs(config: IConfigFile): [string, IDirConfig][] {
  return Object.entries(config?.directories ?? {});
}
