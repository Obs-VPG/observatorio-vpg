import { exec } from "child_process";

const uri = process.env.DATABASE_URL;
const outDir = "./backup";

exec(`mongodump --uri="${uri}" --out=${outDir}`, (error, stdout, stderr) => {
  if (error) {
    console.error("Backup failed:", error);
    return;
  }
  console.log("Backup completed");
});
