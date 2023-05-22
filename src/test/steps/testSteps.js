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
  it("First Test steps", async () => {
    const email = users.firstUser.email;
    await browser.url(env.startUrl);
    await homePage.waitForFormIsOpened();
    expect(await browser.getCurrentUrl()).to.include("euronews.com");

    await homePage.clickContinueWithoutAgree();
    await homePage.clickNewsletter();
    expect(await browser.getCurrentUrl()).to.include("/newsletters");

    let index = await newsletterPage.getRandomNewslettersIndex();
    await newsletterPage.clickRandomNewsLetter(index);
    // expect-chose button has changed (text changed,color also)
    expect(await newsletterPage.isEmailLetterPresent()).to.be.true;

    await newsletterPage.enterEmail(email);
    await newsletterPage.clickSubmit();
    expect(await newsletterPage.isPopupFormPresent()).to.be.true;

    await newsletterPage.closePopupMessage();
    await newsletterPage.seeRandomPreviewPlan(index);
    // expect(await newsletterPage.isPreviewPlanOpen(index)).to.be.true;

    let url = await newsletterPage.getUnsubscribeLink();
    console.log(url);
    await newsletterPage.gotoUnsubscribeLink(url);
    await browser.switchWindow("Newsletter unsubscription");
    // exect-unsubscribe opened

    await unsubscribePage.enterEmail(email);
    await unsubscribePage.clickSubmit();
    // expect-popup of cancelletion present
  });

  it("second test steps", async function () {
    await browser.url(env.startUrl);
    await homePage.waitForFormIsOpened();
    expect(await browser.getCurrentUrl()).to.include("euronews.com");

    await homePage.clickContinueWithoutAgree();
    await homePage.clickNewsletter();
    expect(await browser.getCurrentUrl()).to.include("/newsletters");

    let value = await newsletterPage.getAllAvailableNewsLettersData();
    expect(value).to.include.deep.members(newsletterData);

    await newsletterPage.clickSpecialCoveragePreview();
    // expect-no preview popup

    await newsletterPage.closePopupMessage();
    // await newsletterPage.seePreviewPlan();

    // let url = await newsletterPage.getAllNewslettersLink();
    // console.log("this is url=" + url);
    // await newsletterPage.gotoLink(url[0], "Newsletters - Euronews");
    // expect(await browser.getCurrentUrl()).to.include("/newsletters");
  });
});
