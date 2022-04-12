const puppeteer = require("puppeteer");
const websites = require("../../websites.json");
const { email, password, lastname } = require("../modules/account");
const linkedin = require("./linkedin");

(async () => {
    try {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto("https://www.linkedin.com/feed/");

        const loginEmail = await page.waitForSelector('body > div > main > form > section > div:nth-child(2) > input');
        const loginPassword = await page.waitForSelector('body main input[type="password"]');
        
        await loginEmail.type(email)
        await loginPassword.type(password);

        const clickButton = await page.waitForSelector('button[type="submit"]');
        await clickButton.click();

        const loginName = await page.waitForSelector('#first-name');
        const loginLastname = await page.waitForSelector('#last-name');
        
        await loginName.type(name);
        await loginLastname.type(lastname);
        await clickButton.click();

        // const loginPhone = await page.waitForSelector('#register-verification-phone-number');
        // await loginPhone.type(phone);
        // await clickButton.click();


        for (const website of websites) {
            linkedin(page, website)
        }
    } catch (error) {
        return {
            type: "Error",
            message: "Something happend"
        }
    }
})()