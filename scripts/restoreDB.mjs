import { spawn } from "child_process";
import path from "path";

const uri = process.env.DATABASE_URL_DEV;
const backupPath = path.resolve("./backup");

console.log("URI:", uri);
console.log("Backup path:", backupPath);

const restore = spawn("mongorestore", [`--uri=${uri}`, "--drop", backupPath], {
  stdio: "inherit",
});

restore.on("error", (err) => {
  console.error("Failed to start process:", err);
});

restore.on("close", (code) => {
  console.log(`Restore finished with code ${code}`);
});
