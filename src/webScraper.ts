import { chromium, firefox, webkit } from 'playwright';

export async function webScrapeFn(){
    try {
        const browser = await chromium.launch({timeout: 60000});
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://www.notion.com/", {timeout: 1000000});
        await browser.close();
        
    } catch (error){
        console.error("An error occured:", error)
    }
    
};


