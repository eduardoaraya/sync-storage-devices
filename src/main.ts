import os from "os";
import path from "path";
import fs from "fs";
import childProcess from "child_process";
import Rsync from "rsync";

interface IConfigFile {
  schedule: number;
  dirs: string[];
  dest: string;
  // zipPattern: string[],
  // backupAddress: string;
}

const defaulConfig: IConfigFile = {
  schedule: 10000,
  dirs: [],
  dest: "",
};

(async () => {
  // const configFile = path.join(os.homedir(), ".sync-storage-devices.json");
  const configFilePath = path.join(".sync-storage-devices.json");
  if (!(await fs.existsSync(configFilePath))) {
    fs.writeFileSync(configFilePath, JSON.stringify(defaulConfig, null, " "));
  }
  const content: string = await fs
    .readFileSync(configFilePath)
    .toString("utf-8");

  // Verify and create directories configured
  const config: IConfigFile = JSON.parse(content);
  const dirToCreate = (config.dirs ?? [])
    .filter(async (dir) => !(await fs.existsSync(dir)))
    ?.map(async (dir) => fs.mkdirSync(dir, { recursive: true }));
  if (dirToCreate.length) await Promise.all(dirToCreate);
  // ------------------------------------------

  // Sync directory
  const destiny = path.resolve(".", "serverTeste");
  if (!(await fs.existsSync(destiny))) await fs.mkdirSync(destiny);
  for (const dir of config.dirs) {
    const rsync = new Rsync()
      .progress()
      .shell("ssh")
      .flags("az")
      .source(dir)
      .destination(`${config.dest}:/mnt/shared/${dir}`);
    rsync
      .execute(function (error, code, cmd) {
        console.log(error, code, cmd);
      })
      .on("message", (message) => console.log(message.toString()));
  }

  // childProcess.exec(
  //   `${path.resolve("/usr/bin/rsycn")} ${path.resolve(dir)} ${destiny}`,
  //   (error, stdout) => {
  //     console.log({ error, stdout });
  //   }
  // );
})();
