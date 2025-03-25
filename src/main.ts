import { execRsync } from "./lib/rsync";

(async () => {
  await execRsync();
  console.info("Sync finished!");
  process.exit();
})();
