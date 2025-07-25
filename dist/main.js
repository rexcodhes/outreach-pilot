"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const webScraper_1 = require("./webScraper");
const program = new commander_1.Command();
program.name("my-cli").description("A simple CLI application").version("1.0.0");
program
    .command("scrape")
    .argument("<url>", "which site to scrape")
    .action((url) => {
    (0, webScraper_1.webScrapeFn)(url);
});
program.parse(process.argv);
