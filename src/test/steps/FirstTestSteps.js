const { ENVIRONMENT } = require("../../environment/envConfig");
const users = require("../../environment/credentials");
const {
  unsubscribePage,
  homePage,
  newsletterPage,
} = require("../../pages/index");
const { expect } = require("chai");
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
    expect(await newsletterPage.isEmailLetterPresent()).to.be.true;

    await newsletterPage.enterEmail(email);
    await newsletterPage.clickSubmit();
    expect(await newsletterPage.isPopupFormPresent()).to.be.true;

    await newsletterPage.closePopupMessage();
    await newsletterPage.seeRandomPreviewPlan(index);

    let w = await browser.getWindowHandles();

    await browser.switchToWindow(w[1]);
    let url = await newsletterPage.getUnsubscribeLink();

    await browser.closeWindow();
    await browser.switchToWindow(w[0]);
    await newsletterPage.gotoLink(url[0], "Newsletter unsubscription");
    await browser.switchWindow("Newsletter unsubscription");
    expect(await unsubscribePage.isFormOpened()).to.be.true;

    await unsubscribePage.enterEmail(email);
    await unsubscribePage.clickSubmit();
    expect(await unsubscribePage.isPopupFormPresent()).to.contain(
      "You are unsubscribed"
    );
  });
});
