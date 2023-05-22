const BaseForm = require("../../framework/baseForm");
const Element = require("../../framework/element");
const Logger = require("../../framework/logger");

class UnsubscribePage extends BaseForm {
  constructor() {
    super(".unsubscribe-logo", "Unsubcribe Page");
  }

  get emailInputField() {
    return new Element("#email", "Email Input Field");
  }
  get submitButton() {
    return new Element("button= Confirm unsubcription", "Submit Button");
  }
  get popupMessage() {
    return new Element("#additional-data-modal", "Popup Message");
  }
  get closePopupButton() {
    return new Element(".close-modal", "Close Popup Button");
  }

  async enterEmail(text) {
    await this.emailInputField._clearAndSetText(text);
  }
  async clickSubmit() {
    await this.submitButton.clickWithoutClickAbilityCheck();
  }
  async isPopupFormPresent() {
    return await this.popupMessage.state().assertIsDisplayed();
  }
}

module.exports = new UnsubscribePage();
