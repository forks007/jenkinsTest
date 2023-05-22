const BaseForm = require("../../framework/baseForm");
const Element = require("../../framework/element");
const Logger = require("../../framework/logger");

class HomePage extends BaseForm {
  constructor() {
    super(".b-topstories-home__main", "Home page without login");
    // super('.home-globe-container', 'Home page without login');
  }

  get newsletters() {
    return new Element(
      'span[data-event="newsletter-link-header"]',
      "Newsletter Link"
    );
  }

  get continueWithoutAgree() {
    return new Element(
      '//*[@id="didomi-popup"]/div/div/div/span',
      "Continue Without Agreeing Link"
    );
  }

  get signUpButton() {
    return new Element('button[type="submit"]', '"Sign Up For GitHub" button');
  }
  get emailInput() {
    return new Element("#user_email", "Input for email");
  }

  async typeEmail(text) {
    return this.emailInput.type(text);
  }

  async clickSignUp() {
    return this.signUpButton.click();
  }

  async clickNewsletter() {
    return this.newsletters.click();
  }
  async clickContinueWithoutAgree() {
    return this.continueWithoutAgree.click();
  }
}

module.exports = new HomePage();
