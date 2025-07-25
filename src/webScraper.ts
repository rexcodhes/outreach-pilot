const { chromium } = require("playwright");
import { writeFileFn } from "./writeFile";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let pages: string[] = [];
//needs to change

export async function webScrapeFn(url: string) {
  console.time("start");
  let mails = new Set<string>();

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url);
  await page.waitForLoadState("domcontentloaded");
  const pageData = page.locator("body");
  const pageDataInnerText = await pageData.innerText();
  pages.push(pageDataInnerText);
  console.log(pageDataInnerText);
  const hrefs = await page.evaluate(() => {
    return Array.from(document.links)
      .map((item) => item.href)
      .filter((href) => href.startsWith("http"));
  });
  for (let index = 0; index < hrefs.length; index++) {
    const newPage = await browser.newPage();
    try {
      await newPage.goto(hrefs[index]);
      await newPage.waitForLoadState();
      const newPageData = newPage.locator("body");
      const otherPageData = await newPageData.innerText();
      pages.push(otherPageData);

      const html = await newPage.content();

      const mailData = html.match(
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
      );
      if (mailData) {
        mailData.forEach((email) => mails.add(email));
      }
      await newPage.close();
      await sleep(500);
    } catch (err) {
      console.error(`error fetching ${err}`);
    } finally {
      let pagesSingle: string = pages.join(" ");

      await writeFileFn("./websiteData/websitedata.md", pagesSingle);
    }
  }
  console.log(`List of mails`, [...mails]);

  await browser.close();
  console.timeEnd("start");
}
