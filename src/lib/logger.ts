import fs from "fs";
import path from "path";

function createLog(type: string) {
  const date = new Date();
  const stream = fs.createWriteStream(
    path.resolve(
      ".",
      "logs",
      `${type}-${date.toLocaleDateString("en-us").replaceAll("/", "-")}.txt`
    ),
    {
      encoding: "utf-8",
      autoClose: true,
      flags: "a",
    }
  );
  return {
    log: (content: string) => stream.write(content),
    close: () => stream.close(),
  };
}

export function logError() {
  return createLog("error");
}

export function log() {
  return createLog("log");
}
