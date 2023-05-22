const { ENVIRONMENT } = require("../../environment/envConfig");
const users = require("../../environment/credentials");
const {
  unsubscribePage,
  homePage,
  newsletterPage,
} = require("../../pages/index");
const { expect } = require("chai");
const newsletterData = require("../../testData/newsletterData");
const env = require(`../../environment/${ENVIRONMENT}Environment`);

describe("Euronews(WEB)", async () => {
  it("second test steps", async function () {
    await browser.url(env.startUrl);
    await homePage.waitForFormIsOpened();
    expect(await browser.getCurrentUrl()).to.include("euronews.com");

    await homePage.clickContinueWithoutAgree();
    await homePage.clickNewsletter();
    expect(await browser.getCurrentUrl()).to.include("/newsletters");

    let value = await newsletterPage.getAllAvailableNewsLettersData();
    expect(value).to.include.deep.members(newsletterData);

    let index = await newsletterPage.getRandomNewslettersIndex();
    await newsletterPage.seeRandomPreviewPlan(index);
    let w = await browser.getWindowHandles();

    await browser.switchToWindow(w[1]);
    let url = await newsletterPage.getAllNewslettersLink();

    await newsletterPage.gotoLink(url[0], "Newsletters - Euronews");
    expect(await browser.getCurrentUrl()).to.include("/newsletters");
  });
});
