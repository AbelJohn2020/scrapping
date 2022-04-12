module.exports = async (page, website) => {
    await page.goto(website.url)
}