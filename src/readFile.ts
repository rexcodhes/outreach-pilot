import * as fs from "fs";
const filePath: string = "./websiteData/websitedata.md";

fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
