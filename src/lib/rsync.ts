import { IConfigFile, IDirConfig, loadConfig, loadDirs } from "./config";
import Rsync from "rsync";
import { log } from "./logger";

export async function execRsync(bkp: boolean = true) {
  const config = await loadConfig();
  const dirs = loadDirs(config);
  for (const [label, dir] of dirs) {
    if (!dir.source.length) continue;
    const r = rsyncBuild(dir, label, config, bkp);
    try {
      await exec(r);
    } catch (e) {
      console.error(`Error: ${label}`);
      process.exit(1);
    }
  }
}

export function rsyncBuild(
  dir: IDirConfig,
  label: string,
  config: IConfigFile,
  bkp: boolean = true
) {
  console.info(`Creating ${label}...`);
  const r = Rsync.build({
    progress: true,
    recursive: true,
    archive: true,
    shell: "ssh",
    source: dir.source ?? [],
    compress: true,
    exclude: dir.ignore ?? [],
    destination: `${config.defaultOutput}/${label}`,
  });
  if (bkp) {
    r.set("backup");
    r.set(
      "backup-dir",
      `${config.defaultOutput}/backups/${label}-${new Date()
        .toLocaleDateString("en-us")
        .replaceAll("/", "-")}`
    );
  }
  return r;
}

async function exec(r: any) {
  if (!(r instanceof Rsync)) return;
  const logger = log();
  return new Promise((resolve, reject) => {
    r.execute(
      (err, code, cmd) => {
        logger.log(`cmd finished: ${cmd}`);
        logger.close();
        if (err) return reject(err);
        resolve(code);
      }
      // (data) => logger.log(data.toString())
    );
  });
}
