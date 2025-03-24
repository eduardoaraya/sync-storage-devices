import { IConfigFile } from "./config";
import fs from "fs";

export async function validate(config: IConfigFile) {
  const directories = Object.entries(config?.directories ?? {});
  const notExistsList = directories
    .reduce(
      (red, [_, dirConfig]) => [...red, ...dirConfig.source],
      [] as string[]
    )
    .filter((dir: string) => !fs.existsSync(dir));

  if (notExistsList.length > 0) {
    console.error("Directory not found", notExistsList);
    process.exit(1);
  }
  console.info("Diretorios encontrados!");
}
