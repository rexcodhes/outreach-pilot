"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webScrapeFn = webScrapeFn;
const { chromium } = require("playwright");
const writeFile_1 = require("./writeFile");
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
let pages = [];
//needs to change
function webScrapeFn(url) {
    return __awaiter(this, void 0, void 0, function* () {
        console.time("start");
        let mails = new Set();
        const browser = yield chromium.launch({ headless: true });
        const page = yield browser.newPage();
        yield page.goto(url);
        yield page.waitForLoadState("domcontentloaded");
        const pageData = page.locator("body");
        const pageDataInnerText = yield pageData.innerText();
        pages.push(pageDataInnerText);
        console.log(pageDataInnerText);
        const hrefs = yield page.evaluate(() => {
            return Array.from(document.links)
                .map((item) => item.href)
                .filter((href) => href.startsWith("http"));
        });
        for (let index = 0; index < hrefs.length; index++) {
            const newPage = yield browser.newPage();
            try {
                yield newPage.goto(hrefs[index]);
                yield newPage.waitForLoadState();
                const newPageData = newPage.locator("body");
                const otherPageData = yield newPageData.innerText();
                pages.push(otherPageData);
                const html = yield newPage.content();
                const mailData = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
                if (mailData) {
                    mailData.forEach((email) => mails.add(email));
                }
                yield newPage.close();
                yield sleep(500);
            }
            catch (err) {
                console.error(`error fetching ${err}`);
            }
            finally {
                let pagesSingle = pages.join(" ");
                yield (0, writeFile_1.writeFileFn)("./websiteData/websitedata.md", pagesSingle);
            }
        }
        console.log(`List of mails`, [...mails]);
        yield browser.close();
        console.timeEnd("start");
    });
}
