import { Command } from "commander";
import { webScrapeFn } from "./webScraper";
import { sendMailFN } from "./sendMailFunc";

const program = new Command();

program.name("my-cli").description("A simple CLI application").version("1.0.0");

program
  .command("scrape")
  .argument("<url>", "which site to scrape")
  .action((url: string) => {
    webScrapeFn(url);
  });

program
  .command("sendMail")
  .argument("<toWhom>", "To whom you want to send the mail to?")
  .argument("<subjectMail>", "Subject of the mail")
  .argument("<mailData>", "What message do you want to send?")
  .action((sendMail: string, toWhom: string, mailData: string) => {
    sendMailFN(sendMail, toWhom, mailData);
  });

program.parse(process.argv);
