import { Given, When, Then } from '@cucumber/cucumber';

import { Ctx } from '../support/world';
import { userSelector } from '../utils/helper';
// import { getLocation } from '../utils/browser';
import { clearCookies, clearLocalStorage, getLocation, localStorageGet, localStorageSet } from '../utils/browser';
import { BASE_URL } from '../environment';
import { $ } from '../utils';
import { tryDeleteOrgWithItemId, insertOrganisationWitItemId } from '../utils/dbUtil';
import OrganisationPageModel from '../page_objects/OrganisationViewDetails';

enum LocalStorageKeys {
  ORG_NAME = 'organisation-name',
  LEGAL_NAME = 'legal-name',
  MAIN_ACRONYM = 'main-acronym',
  RECOGNITION_NUMBER = 'recognition-number',
  COMPANY_NUMBER = 'company-number'
}

// Given(/^I am on the organisations page$/, async function(this: Ctx) {
//     const t = await this.getTestController();
//     await t.navigateTo(`${BASE_URL}/organisations`);
//     await userSelector(t, "complaints.admin@ofqual.gov.uk");
// });

// // this is the step to insert an org with a specific ID:
// Given(/^an organisation with the Item ID "(.*)" exists$/, async function (this: Ctx, orgId: string) {
//   const numericalId = Number.parseInt(orgId);
//   await tryDeleteOrgWithItemId(numericalId);
//   await insertOrganisationWitItemId(numericalId);
// });

Given(/^I am on the organisations page$/, async function (this: Ctx) {
  const t = await this.getTestController();

  // this is crucial
  await clearCookies(t);
  await clearLocalStorage(t);

  await t.navigateTo(`${BASE_URL}/organisations`);
  await userSelector(t, 'complaints.admin@ofqual.gov.uk');
});

When(/^I choose the organisation with the ID "(.*)"$/, async function (this: Ctx, orgId: string) {
  const t = await this.getTestController();
  await t.navigateTo(`${BASE_URL}/organisations/${orgId}`);
});

Then(/^I am on the correct organisation detail page "(.*)"$/, async function (this: Ctx, orgId: string) {
  const t = await this.getTestController();
  await t.expect(getLocation(t)).contains(`${BASE_URL}/organisations/${orgId}`);
});

Then(/^I accept the cookies if I see them$/, async function (this: Ctx) {
  const t = await this.getTestController();
  const cookieOkButtonSelector = $('#rcc-confirm-button');
  if (await cookieOkButtonSelector.exists) {
    await t.click(cookieOkButtonSelector);
  }
});

Then(
  /^I enter organisation details "(.*)" "(.*)" "(.*)" "(.*)" "(.*)"$/,
  async function (this: Ctx, orgName: string, legalName: string, mainAcronym: string, recognitionNumber: string, companyNumber: string) {
    const t = await this.getTestController();
    const suffix = () => Date.now().toString().substring(8);

    const newOrgName = `${orgName}-${suffix()}`;
    const newLegalName = `${legalName}-${suffix()}`;
    const newMainAcronym = `${mainAcronym}-${suffix()}`;
    const newRecognitionNumber = `${recognitionNumber}-${suffix()}`;
    const newCompanyNumber = `${companyNumber}-${suffix()}`;

    await t.typeText(OrganisationPageModel.organisationDetailsMainName, newOrgName, { replace: true });
    await t.typeText(OrganisationPageModel.organisationsLegalNameField, newLegalName, { replace: true });
    await t.typeText(OrganisationPageModel.organisationDetailsMainAcronym, newMainAcronym, { replace: true });
    await t.typeText(OrganisationPageModel.recognitionNumberField, newRecognitionNumber, { replace: true });
    await t.typeText(OrganisationPageModel.companyNumberField, newCompanyNumber, { replace: true });

    await localStorageSet(t, LocalStorageKeys.ORG_NAME, newOrgName);
    await localStorageSet(t, LocalStorageKeys.LEGAL_NAME, newLegalName);
    await localStorageSet(t, LocalStorageKeys.MAIN_ACRONYM, newMainAcronym);
    await localStorageSet(t, LocalStorageKeys.RECOGNITION_NUMBER, newRecognitionNumber);
    await localStorageSet(t, LocalStorageKeys.COMPANY_NUMBER, newCompanyNumber);
  }
);

When(/^I click the save button$/, async function (this: Ctx) {
  (await this.getTestController()).click(OrganisationPageModel.saveButton);
});

When(/^I close the dialogbox by saving$/, async function (this: Ctx) {
  (await this.getTestController()).click(OrganisationPageModel.saveDialogClose);
});

When(/^I click the review pending changes on the bottom of the screen$/, async function (this: Ctx) {
  (await this.getTestController()).click(OrganisationPageModel.reviewChangesButton);
});

When(/^I update review "(.*)"$/, async function (this: Ctx, status: string) {
  const t = await this.getTestController();

  if (status === 'approve') {
    await t.click(OrganisationPageModel.acceptReviewChange);
  } else {
    await t.click(OrganisationPageModel.rejectReviewChange);
  }
  //const modalTextSelector = $('div[role="dialog"] .MuiDialogContent-root');
  //await t
  //  .expect(modalTextSelector.textContent)
  //  .contains("There are no changes left to approve");
});

When(/^I close the dialogbox$/, async function (this: Ctx) {
  (await this.getTestController()).click(OrganisationPageModel.closeChangeButton);
});

Then(/^updated detail should be present on the activity channel "(.*)"$/, async function (this: Ctx, status: string) {
  const t = await this.getTestController();

  // const mainAcronym: string = (await localStorageGet(t, LocalStorageKeys.MAIN_ACRONYM)) || '';
  // const companyNumber: string = (await localStorageGet(t, LocalStorageKeys.COMPANY_NUMBER)) || '';
  // const recognitionNumber: string = (await localStorageGet(t, LocalStorageKeys.RECOGNITION_NUMBER)) || '';
  //
  // if (status === 'approve') {
  //   await t.expect($('span[data-test=metadata-acronym]').textContent).eql(mainAcronym);
  //   await t.expect($('span[data-test=metadata-companyRegNumber]').textContent).eql(companyNumber);
  //   await t.expect($('span[data-test=metadata-recognitionNumber]').textContent).eql(recognitionNumber);
  // } else {
  //   // all rejected
  //   await t.expect($('span[data-test=metadata-acronym]').textContent).notEql(mainAcronym);
  //   await t.expect($('span[data-test=metadata-companyRegNumber]').textContent).notEql(companyNumber);
  //   await t.expect($('span[data-test=metadata-recognitionNumber]').textContent).notEql(recognitionNumber);
  // }
  await t.expect(OrganisationPageModel.activityBody.textContent).contains(status);

  // TODO
  // secondary-app-bar-title -> span
  //await localStorageGet(t, LocalStorageKeys.ORG_NAME);
  //await localStorageGet(t, LocalStorageKeys.LEGAL_NAME);
});

When(/^I fill in the organisation details$/, async function (this: Ctx, dataTable: { rawTable: [any] }) {
  const t = await this.getTestController();
  const suffix = () => Date.now().toString().substring(8);

  const firstRow: string[] = dataTable.rawTable.slice(1)[0];

  const newOrgName = `${firstRow[0]}-${suffix()}`;
  const newLegalName = `${firstRow[1]}-${suffix()}`;
  const newMainAcronym = `${firstRow[2]}-${suffix()}`;
  const newRecognitionNumber = `${firstRow[3]}-${suffix()}`;
  const newCompanyNumber = `${firstRow[4]}-${suffix()}`;

  await t.typeText(OrganisationPageModel.organisationDetailsMainName, newOrgName, { replace: true });
  await t.typeText(OrganisationPageModel.organisationsLegalNameField, newLegalName, { replace: true });
  await t.typeText(OrganisationPageModel.organisationDetailsMainAcronym, newMainAcronym, { replace: true });
  await t.typeText(OrganisationPageModel.recognitionNumberField, newRecognitionNumber, { replace: true });
  await t.typeText(OrganisationPageModel.companyNumberField, newCompanyNumber, { replace: true });

  await localStorageSet(t, LocalStorageKeys.ORG_NAME, newOrgName);
  await localStorageSet(t, LocalStorageKeys.LEGAL_NAME, newLegalName);
  await localStorageSet(t, LocalStorageKeys.MAIN_ACRONYM, newMainAcronym);
  await localStorageSet(t, LocalStorageKeys.RECOGNITION_NUMBER, newRecognitionNumber);
  await localStorageSet(t, LocalStorageKeys.COMPANY_NUMBER, newCompanyNumber);
});

When(/^I approve some amended fields$/, async function (this: Ctx) {
  const t = await this.getTestController();
  await t.click(OrganisationPageModel.acceptReviewChange);
  await t.click(OrganisationPageModel.acceptReviewChange);
  await t.click(OrganisationPageModel.acceptReviewChange);
});

When(/^I rejects some amended fields$/, async function (this: Ctx) {
  const t = await this.getTestController();
  await t.click(OrganisationPageModel.rejectReviewChange);
});

Then(/^I should see "(.*)" modal displayed with all amended fields$/, async function (this: Ctx, text: string) {
  const t = await this.getTestController();

  const modalTextSelector = $('div[data-test="save-title"]');
  await t.expect(modalTextSelector.textContent).contains(text);

  // await t.expect($('div[data-test="change-recognitionNumber"]').exists).eql(true);
  // await t.expect($('div[data-test="change-companyNumber"]').exists).eql(true);
  // await t.expect($('div[data-test="change-acronym"]').exists).eql(true);
  // await t.expect($('div[data-test="change-name"]').exists).eql(true);
  // await t.expect($('div[data-test="change-legalName"]').exists).eql(true);
});

Then(/^I fill in the organization details$/, async function (this: Ctx) {
  const t = await this.getTestController();
  await t.typeText(OrganisationPageModel.organisationDetailsMainName, `name-${Date.now()}`, { replace: true });
  await t.typeText(OrganisationPageModel.organisationsLegalNameField, `legal-name-${Date.now()}`, { replace: true });
  await t.typeText(OrganisationPageModel.organisationDetailsMainAcronym, `acronym-${Date.now()}`.substring(0, 16), { replace: true });
  await t.typeText(OrganisationPageModel.recognitionNumberField, `${Date.now()}`, { replace: true });
  await t.typeText(OrganisationPageModel.companyNumberField, `${Date.now()}`, {
    replace: true
  });
});

When(/^I amend the following field "(.*)" "(.*)" "(.*)" "(.*)" "(.*)" "(.*)" "(.*)" "(.*)" "(.*)" "(.*)"$/,
  async function (
    this: Ctx,
    website: string,
    email: string,
    ListOfStandardFees: string,
    addressLine1: string,
    addressLine2: string,
    addressLine3: string,
    addressLine4: string,
    postCode: string,
    country: string,
    phoneNumber: string
  ) {
    const t = await this.getTestController();
    const suffix = () => Date.now().toString().substring(8);

    const newWebsite = `${website}-${suffix()}`;
    const newEmail = `${email}-${suffix()}`;
    const newListOfStandardFees = `${ListOfStandardFees}-${suffix()}`;
    const newAddressLine1 = `${addressLine1}-${suffix()}`;
    const newAddressLine2 = `${addressLine2}-${suffix()}`;
    const newAddressLine3 = `${addressLine3}-${suffix()}`;
    const newAddressLine4 = `${addressLine4}-${suffix()}`;
    const newPostCode = `${postCode}-${suffix()}`;
    const newPhoneNumber = `${phoneNumber}-${suffix()}`;

    await t.typeText(OrganisationPageModel.organisationsWebsiteField, newWebsite, { replace: true });
    await t.typeText(OrganisationPageModel.organisationsEmailField, newEmail, { replace: true });
    await t.typeText(OrganisationPageModel.listOfStandardFeesField, newListOfStandardFees, { replace: true });
    await t.typeText(OrganisationPageModel.addressLine1, newAddressLine1, { replace: true });
    await t.typeText(OrganisationPageModel.addressLine2, newAddressLine2, { replace: true });
    await t.typeText(OrganisationPageModel.addressLine3, newAddressLine3, { replace: true });
    await t.typeText(OrganisationPageModel.addressLine4, newAddressLine4, { replace: true });
    await t.typeText(OrganisationPageModel.addressPostcode, newPostCode, { replace: true });
    await OrganisationPageModel.dropDownSelector(t, OrganisationPageModel.addressCountry, country );
    await t.typeText(OrganisationPageModel.addressPhoneNumber, newPhoneNumber, { replace: true });

    await localStorageSet(t, LocalStorageKeys.ORG_NAME, newWebsite);
    // await localStorageSet(t, LocalStorageKeys.LEGAL_NAME, newLegalName);
    // await localStorageSet(t, LocalStorageKeys.MAIN_ACRONYM, newMainAcronym);
    // await localStorageSet(t, LocalStorageKeys.RECOGNITION_NUMBER, newRecognitionNumber);
    // await localStorageSet(t, LocalStorageKeys.COMPANY_NUMBER, newCompanyNumber);
  }
);


When(/^I amend the email field$/, async function (this: Ctx, dataTable: { rawTable: [any] }) {
  const t = await this.getTestController();
  const suffix = () => Date.now().toString().substring(8);

  const firstRow: string[] = dataTable.rawTable.slice(1)[0];

  const newEmail = `${firstRow[0]}-${suffix()}`;

  await t.typeText(OrganisationPageModel.organisationsEmailField, newEmail, { replace: true });
});


When(/^I amend the ListOfStandardFees field$/, async function (this: Ctx, dataTable: { rawTable: [any] }) {
  const t = await this.getTestController();
  const suffix = () => Date.now().toString().substring(8);

  const firstRow: string[] = dataTable.rawTable.slice(1)[0];

  const newListOfStandardFees = `${firstRow[0]}-${suffix()}`;

  await t.typeText(OrganisationPageModel.listOfStandardFeesField, newListOfStandardFees, { replace: true });

});


When(/^I amend the postCode field$/, async function (this: Ctx, dataTable: { rawTable: [any] }) {
  const t = await this.getTestController();
  const suffix = () => Date.now().toString().substring(8);

  const firstRow: string[] = dataTable.rawTable.slice(1)[0];

  const newPostCode = `${firstRow[0]}-${suffix()}`;

  await t.typeText(OrganisationPageModel.addressPostcode, newPostCode, { replace: true });

});

When(/^I click on the metaDataWebsiteLink$/, async function (this: Ctx) {
  const t = await this.getTestController();

  await t.click(OrganisationPageModel.metadataWebsiteLink);

});

When(/^I click on the metadataListOfStandardFeesLink$/, async function (this: Ctx) {
  const t = await this.getTestController();

  // await t.click(OrganisationPageModel.metadataListOfStandardFeesLink);
});

