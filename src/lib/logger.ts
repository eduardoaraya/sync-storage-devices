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
    "utf-8"
  );
  stream.on("close", () => console.log("closed"));
  stream.on("finish", () => console.log("finished"));
  stream.on("ready", () => console.log("ready"));
  stream.on("pipe", (data) => console.log("data", data));
  return {
    write: (content: string) => stream.write(content),
    stream,
  };
}

export async function logError(content: string) {
  return createLog("error").write(content);
}

export async function log(content: string) {
  return createLog("log").write(content);
}
