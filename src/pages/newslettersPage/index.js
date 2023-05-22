const BaseForm = require("../../framework/baseForm");
const Element = require("../../framework/element");
const Logger = require("../../framework/logger");
const newslettersData = require("../../testData/newsletterData");
const { newsletters } = require("../homePage");

class NewslettersPage extends BaseForm {
  constructor() {
    super("//span[@class='h1 text-secondary']", "newsletters Page");
  }

  getNewsletterSubscriptionPlan(index) {
    return new Element(
      `//form[@id='newsletters-form']//div[contains(@class, 'bg-white')][${index}]//label[contains(.,'Choose this newsletter')]`,
      "Random Newsletter Plan"
    );
  }

  get emailForm() {
    return new Element(".cta-newsletter-esturgeon", "Email Form");
  }
  get emailInputField() {
    return new Element(
      'input[placeholder="Enter your email"]',
      "Email Input Field"
    );
  }
  get submitButton() {
    return new Element('input[value="Submit"]', "Submit Button");
  }
  get popupMessage() {
    return new Element("#additional-data-modal", "Popup Message");
  }
  get closePopupButton() {
    return new Element(".close-modal", "Close Popup Button");
  }
  getSeePreviewButton(number) {
    return new Element(
      `//form[@id='newsletters-form']//div[contains(@class, 'bg-white')][${number}]//a`,
      "See Preview Button"
    );
  }
  getPreviewPlanForm(number) {
    return new Element(
      `//form[@id='newsletters-form']//div[contains(@id, '_previews')][${number}]//iframe`,
      "Preview Plan Form"
    );
  }
  get linkToUnsubscribe() {
    return new Element("=clicking here", "Link to Unsubscribe");
  }
  get allNewsletters() {
    return new Element(
      "//form[@id='newsletters-form']//div[contains(@class, 'bg-white')]",
      "All News Letter Plan"
    );
  }
  getnameOfNewsletterPlan(number) {
    return new Element(
      `//form[@id='newsletters-form']//div[contains(@class, 'bg-white')][${number}]//h2`,
      "Name Of Newsletter Plan"
    );
  }
  getFrequencyOfNewsletterPlan(number) {
    return new Element(
      `//form[@id='newsletters-form']//div[contains(@class, 'bg-white')][${number}]/div/p`,
      "Frequency Of Newsletter Plan"
    );
  }
  getDescriptionOfNewsletterPlan(number) {
    return new Element(
      `//form[@id='newsletters-form']//div[contains(@class, 'bg-white')][${number}]//div//div//p`,
      "Description Of Newsletter Plan"
    );
  }

  get seePreviewSpecialCoverageButton() {
    return new Element(
      "//a[@href='#special-coverage_previews']",
      "Preview Special Coverage Button"
    );
  }

  get noPreviewPopUp() {
    return new Element(
      "//div[@id='special-coverage_previews']",
      "No Preview Popup"
    );
  }

  get linkToAllNewsletter() {
    return new Element(
      "=See all our newsletters",
      "Link to See All Newsletter"
    );
  }

  async getRandomNewslettersIndex() {
    let number = await this.allNewsletters.getElementsCount();
    return Math.floor(Math.random() * (number - 2)) + 1;
  }

  async clickRandomNewsLetter(index) {
    return this.getNewsletterSubscriptionPlan(index).click();
  }

  async isEmailLetterPresent() {
    return await this.emailForm.state().assertIsDisplayed();
  }

  async enterEmail(text) {
    await this.emailInputField.type(text);
  }
  async clickSubmit() {
    await this.submitButton.click();
  }
  async isPopupFormPresent() {
    return await this.popupMessage.state().assertIsDisplayed();
  }
  async closePopupMessage() {
    await this.closePopupButton.click();
  }
  async seeRandomPreviewPlan(index) {
    await this.getSeePreviewButton(index).click();
  }
  async isPreviewPlanOpen(index) {
    return await this.getPreviewPlanForm(index).state().isDisplayed();
  }
  async getUnsubscribeLink() {
    await this.previewPlanForm.switchFrame();
    return await this.linkToUnsubscribe.getAttributeFromElements("href");
  }
  async getAllNewslettersLink() {
    await this.previewPlanForm.switchFrame();
    return await this.linkToAllNewsletter.getAttributeFromElements("href");
  }
  async gotoLink(link, name) {
    await browser.newWindow(link, name);
  }

  async checkNewsletterData() {
    console.log(newslettersData);
  }

  async getAllNewslettersName(index) {
    return await this.getnameOfNewsletterPlan(index).getTextFromElements();
  }
  async getAllFrequencyOfNewsletters(index) {
    return await this.getFrequencyOfNewsletterPlan(index).getTextFromElements();
  }
  async getAllDescriptionOfNewsletters(index) {
    return await this.getDescriptionOfNewsletterPlan(
      index
    ).getTextFromElements();
  }

  async getAllAvailableNewsLettersData() {
    let number = await this.allNewsletters.getElementsCount();
    let value = [];
    for (let n = 1; n <= number; n++) {
      let name = await this.getAllNewslettersName(n);
      let freq = await this.getAllFrequencyOfNewsletters(n);
      let des = await this.getAllDescriptionOfNewsletters(n);
      value.push({ name: name[0], frequency: freq[0], description: des[0] });
    }
    return value;
  }

  async clickSpecialCoveragePreview() {
    await this.seePreviewSpecialCoverageButton.click();
  }

  async checkSpecialCoveragePreviewPopup() {
    await this.noPreviewPopUp.state().assertIsDisplayed();
  }
}

module.exports = new NewslettersPage();
