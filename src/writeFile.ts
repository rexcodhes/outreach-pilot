import * as fs from "fs";

let markdownContent: string;
let filePath: string;

export async function writeFileFn(filePath, markdownContent) {
  await fs.writeFile(filePath, markdownContent, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return;
    }
    console.log("Markdown content written to my-file.md successfully!");
  });
}
