import os from "os";
import path from "path";
import fs from "fs";
import childProcess from "child_process";
import Rsync from "rsync";

export interface IDirConfig {
  source: string[];
  output?: string;
  ignore?: string[];
}

export interface IDirecoties {
  [k: string]: IDirConfig
}

interface IConfigFile {
  schedule: number;
  directories?: IDirecoties;
  defaultOutput: string;
}

const defaulConfig: IConfigFile = {
  schedule: 10000,
  defaultOutput: path.resolve(os.homedir(), "sync_directories"),
};

(async () => {
  // const configFile = path.join(os.homedir(), ".sync-storage-devices.json");
  const configFilePath = path.join(".sync-storage-devices.json");
  if (!(await fs.existsSync(configFilePath))) {
    fs.writeFileSync(configFilePath, JSON.stringify(defaulConfig, null, " "));
  }
  const content: string = (await fs
    .readFileSync(configFilePath))
    .toString("utf-8");

  // Verify and create directories configured
  const config: IConfigFile = JSON.parse(content);
  const directories = Object.entries(config?.directories ?? {});

  const notExistsList = directories
    .reduce((red, [_, dirConfig]) => [...red, ...dirConfig.source], [] as string[])
    .filter(async (dir) => !fs.existsSync(dir));

  if (notExistsList.length > 0) {
    console.error("Directory not found", notExistsList);
    process.exit(1);
  }
  

  // Sync directory
  // const destiny = path.resolve(".", "_test");
  // if (!(await fs.existsSync(destiny))) await fs.mkdirSync(destiny);

 // for (const [label, dirs] of Object.entries(config?.dirs)) {
 //   for (const dir of dirs) {
 //     const rsync = new Rsync();
 //     rsync
 //       .progress()
 //       .recursive()
 //       .shell("ssh")
 //       .flags("az")
 //       .source(dir)
 //       .destination(`${config.dest}/${label}`);
 //     console.log(rsync.command());
 //     rsync.output(
 //       function (data) {
 //         console.log(data.toString());
 //       },
 //       function (data) {
 //         console.log(data.toString());
 //       }
 //     );
 //     const stream = rsync.execute(function (error, code, cmd) {
 //       console.log(error, code, cmd);
 //       rsync.dry();
 //     });
 //     stream.on("message", (message) => console.log(message.toString()));
 //     stream.on("error", (message) => console.log(message.toString()));
 //     stream.on("spawn", () => console.log("Spawn"));
 //     stream.on("error", (message) => console.log(message.toString()));
  // }
 // }

  // childProcess.exec(
  //   `${path.resolve("/usr/bin/rsycn")} ${path.resolve(dir)} ${destiny}`,
  //   (error, stdout) => {
  //     console.log({ error, stdout });
  //   }
  // );
})();
