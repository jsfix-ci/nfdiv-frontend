import { State } from '../../main/app/case/definition';
import { ADDRESS_PRIVATE, HOME_URL, THEIR_EMAIL_ADDRESS } from '../../main/steps/urls';
import { autoLogin, config as testConfig } from '../config';

import { checkOptionFor, iAmOnPage, iClearTheForm, iClick, iSetTheUsersCaseTo, iWait } from './common';
import { iEnterTheUkAddress } from './postcode';

const { I } = inject();

Given("I've already completed the form using the fixture {string}", async (fixture: string) => {
  I.amOnPage(HOME_URL);
  const fixtureJson = require(`../functional/fixtures/${fixture}`)[fixture];

  await iSetTheUsersCaseTo(fixtureJson);

  I.amOnPage(ADDRESS_PRIVATE);
  I.click('I do not need my contact details kept private');
  I.click('Continue');
});

Given('I set the email address for applicant 2', async () => {
  I.amOnPage(THEIR_EMAIL_ADDRESS);
  const applicant2EmailAddress = testConfig.GetUser(parseInt('2')).username;

  await iClearTheForm();
  iClick("Your husband's email address");
  I.type(applicant2EmailAddress);
  I.click('Continue');
});

Given(
  "I've already completed the form using the fixture {string} for {string}",
  async (fixture: string, applicant: string) => {
    const fixtureJson = require(`../functional/fixtures/${fixture}`)[fixture];

    await iSetTheUsersCaseTo(fixtureJson);

    I.amOnPage(`/${applicant}` + ADDRESS_PRIVATE);
    I.click('I do not need my contact details kept private');
    I.click('Continue');
  }
);

Given('I set the case state to {string}', async (state: State) => {
  const user = testConfig.GetCurrentUser();
  await iSetTheUsersCaseTo({
    state,
  });
  await I.grabCurrentUrl();
  I.amOnPage('/logout');
  await autoLogin.login(I, user.username, user.password, false);
});

Given("I've completed all happy path questions correctly", async () => {
  iAmOnPage('/your-details');
  iClearTheForm();
  iClick('My husband');
  iClick('Continue');

  I.waitInUrl('/irretrievable-breakdown');
  iClick('I confirm my marriage has broken down irretrievably');
  iClick('Continue');

  I.waitInUrl('/date-from-certificate');
  iClearTheForm();
  iClick('Day');
  I.type('31');
  iClick('Month');
  I.type('12');
  iClick('Year');
  I.type('1999');
  iClick('Continue');

  I.waitInUrl('/do-you-have-your-certificate');
  iClick('Yes, I have my marriage certificate');
  iClick('Continue');

  I.waitInUrl('/help-with-your-fee');
  iClick('I do not need help paying the fee');
  iClick('Continue');

  I.waitInUrl('/how-do-you-want-to-apply');
  iClick('I want to apply on my own, as a sole applicant');
  iClick('Continue');

  I.waitInUrl('/in-the-uk');
  iClick('Yes');
  iClick('Continue');

  I.waitInUrl('/check-jurisdiction');
  iClick('Continue');

  I.waitInUrl('/where-your-lives-are-based');
  checkOptionFor('Yes', 'Is your life mainly based in England or Wales?');
  checkOptionFor('Yes', 'Is your husband’s life mainly based in England or Wales?');
  iClick('Continue');

  I.waitInUrl('/you-can-use-english-welsh-courts');
  iClick('Continue');

  I.waitInUrl('/enter-your-name');
  iClearTheForm();
  iClick('first name');
  I.type('Test your name');
  iClick('last name');
  I.type('Test your last name');
  iClick('Continue');

  I.waitInUrl('/enter-their-name');
  iClearTheForm();
  iClick('first name');
  I.type('Test their name');
  iClick('last name');
  I.type('Test their last name');
  iClick('Continue');

  I.waitInUrl('/your-names-on-certificate');
  iClearTheForm();
  iClick('Copy your full name');
  I.type('First name Last name');
  iClick("Copy your husband's full name");
  I.type('Husbands name');
  iClick('Continue');

  I.waitInUrl('/changes-to-your-name');
  checkOptionFor('No', 'Did you change your last name when you got married?');
  checkOptionFor('No', 'Have you changed any part of your name since getting married?');
  iClick('Continue');

  I.waitInUrl('/how-the-court-will-contact-you');
  iClearTheForm();
  iClick('I agree that the divorce service can send me notifications');
  iClick('Continue');

  I.waitInUrl('/english-or-welsh');
  iClick('English');
  iClick('Continue');

  I.waitInUrl('/address-private');
  iClick('I do not need my contact details kept private');
  iClick('Continue');

  iAmOnPage('/enter-your-address');
  await iEnterTheUkAddress('BUCKINGHAM PALACE, LONDON, SW1A 1AA');
  iClick('Continue');

  I.waitInUrl('/do-they-have-a-solicitor');
  iClick('No');
  iClick('Continue');

  I.waitInUrl('/their-email-address');
  iClearTheForm();
  iClick("Your husband's email address");
  I.type('husband@example.com');
  iClick('Continue');

  I.waitInUrl('/do-you-have-address');
  iClick('Yes, I have their address');
  iClick('Continue');

  I.waitInUrl('/enter-their-address');
  await iEnterTheUkAddress('MINISTRY OF JUSTICE, SEVENTH FLOOR, 102, PETTY FRANCE, LONDON, SW1H 9AJ');
  iClick('Continue');

  I.waitInUrl('/other-court-cases');
  iClick('No');
  iClick('Continue');

  I.waitInUrl('/dividing-money-property');
  iClick('Continue');

  I.waitInUrl('/do-you-want-to-apply-financial-order');
  iClick('No');
  iClick('Continue');

  I.waitInUrl('/upload-your-documents');
  iClearTheForm();
  iClick('I cannot upload my original marriage certificate');
  iClick('Continue');
  iWait(5);
  I.amOnPage(HOME_URL);

  I.waitInUrl('/check-your-answers');
  iClearTheForm();
  iClick('I confirm');
  iClick('I believe that the facts stated in this application are true');
  iClick('Continue to payment');

  I.waitInUrl('/pay-your-fee');
});

Given('I pay and submit the application', () => {
  I.waitInUrl('/pay-your-fee');
  iClick('Pay and submit application');

  completePayment();
  I.waitInUrl('/application-submitted', 15);
});

Given('I pay and submit the joint application', () => {
  I.waitInUrl('/pay-and-submit');
  iClick('Pay and submit');

  completePayment();
  I.waitInUrl('/joint-application-submitted', 15);
});

const completePayment = () => {
  I.waitInUrl('/card_details', 15);
  iClick('Card number', '#card-no', 15);
  I.type('4444333322221111');
  iClick('Month');
  I.type('12');
  iClick('Year');
  I.type('30');
  iClick('Name on card');
  I.type('Nightly test');
  iClick('Building number or name');
  I.type('BUCKINGHAM PALACE');
  iClick('Town');
  I.type('LONDON');
  iClick('Postcode');
  I.type('SW1A 1AA');
  iClick('Email');
  I.type('nightly-functional-test@example.com');
  iClick('Card security code');
  I.type('123');
  iClick('Continue');

  I.waitInUrl('/card_details');
  I.click('Confirm payment');
};
