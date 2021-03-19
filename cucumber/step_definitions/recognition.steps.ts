import { When, Then } from '@cucumber/cucumber';

import { Ctx } from '../support/world';
import { userSelector } from '../utils/helper';
// import { getLocation } from '../utils/browser';
import { clearCookies, clearLocalStorage } from '../utils/browser';
import { BASE_URL } from '../environment';
import { $ } from '../utils';

import RecognitionPageModel from '../page_objects/recognition_pages';
import recognition_pages from '../page_objects/recognition_pages';

enum LocalStorageKeys {
  ORG_NAME = 'organisation-name',
  LEGAL_NAME = 'legal-name',
  MAIN_ACRONYM = 'main-acronym',
  RECOGNITION_NUMBER = 'recognition-number',
  COMPANY_NUMBER = 'company-number'
}

When(/^I logged in with a user with "(.*)"$/, async function (this: Ctx, userWithRecognitionAccess: string) {
  const t = await this.getTestController();

  // this is crucial
  await clearCookies(t);
  await clearLocalStorage(t);

  await t.navigateTo(`${BASE_URL}/organisations`);
  await userSelector(t, userWithRecognitionAccess);
});

When(/^I click on the Recognition tab$/, async function (this: Ctx) {
  const t = await this.getTestController();

  // Recognition Tab
  await t.click($('[data-test="orgs-main-tabs"] button[role="tab"]:nth-child(2)'));
});

When(/^I can select previuosly submitted applications$/, async function (this: Ctx) {
  const t = await this.getTestController();

  await t.click(RecognitionPageModel.previuoslySubmittedApplication);
  await t.click($('#selectSingle_1_1'));

  // await t.click(RecognitionPageModel.qualificationTypes);
  // await t.click($('#selectMultiple_1_99'));
  // await t.wait(500);

  // await t.click(RecognitionPageModel.caseNoteTextField); // click outside

  // await t.typeText(RecognitionPageModel.otherQualification, 'some text', { replace: true });

  // // calendar
  // await t.click($('[data-test=recognition-details-intend-to-apply-date] button'));
  // // next month
  // await t.click($('.MuiPickersCalendarHeader-switchHeader button:nth-child(3)'));
  // await t.click($('.MuiPickersCalendar-week [role=presentation]'));
  // // close the calendar
  // await t.click($('body'));

  // await t.typeText(RecognitionPageModel.followUpDate, '12/01/2022');

  // await t.click(RecognitionPageModel.saveButton); // click save buttonn

  // await t.debug();
});

When(/^I select an item from the qualificationTypeAppliedForList picklist and other$/, async function (this: Ctx) {
  const t = await this.getTestController();
  // await t.wait(3000)
  await t.click(RecognitionPageModel.qualificationTypes);
  await t.click($('#selectMultiple_1_99'));
  await t.wait(1000);
  await t.click(RecognitionPageModel.caseNoteTextField);
  // await t.debug()
});

When(/^I enter qualification type into the "(.*)"$/, async function (this: Ctx, otherQualification: string) {
  const t = await this.getTestController();
  await t.typeText(RecognitionPageModel.otherQualification, otherQualification.repeat(10), { replace: true });
});

When(/^I select a date from the dateIntendingToApplyCalendarPicker$/, async function (this: Ctx) {
  const t = await this.getTestController();
  // calendar
  await t.click($('[data-test=recognition-details-intend-to-apply-date] button'));
  // next month
  await t.click($('.MuiPickersCalendarHeader-switchHeader button:nth-child(3)'));
  await t.click($('.MuiPickersCalendar-week [role=presentation]'));
  // close the calendar
  await t.click($('body'));
});

When(/^I select a date from the followUpDateDatePicker$/, async function (this: Ctx) {
  const t = await this.getTestController();
  await t.typeText(RecognitionPageModel.followUpDate, '12/01/2022');
});

When(/^I enter the following recognition details "(.*)"$/, async function (this: Ctx, caseNoteField: string) {
  const t = await this.getTestController();
  await t.typeText(RecognitionPageModel.caseNoteTextField, caseNoteField.repeat(20), { replace: true });
});

Then(/^I should not see the recognition tab$/, async function (this: Ctx) {
  const t = await this.getTestController();

  const isVisible = await $('[data-test="orgs-main-tabs"] button[role="tab"]:nth-child(2)').visible;
  t.expect(isVisible).eql(false);
});
