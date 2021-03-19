// this is the step to insert an org with a specific ID:
import { Given, When,  Then } from '@cucumber/cucumber';
import { Ctx } from '../../support/world';
import { insertOrganisationWitItemId, tryDeleteOrgWithItemId } from '../../utils/dbUtil';
import { clearCookies, clearLocalStorage } from '../../utils/browser';
import { BASE_URL } from '../../environment';
import { userSelector } from '../../utils/helper';
import  OrganisationPageModel from '../../page_objects/OrganisationViewDetails';

Given(/^an organisation with the Item ID "(.*)" exists$/, async function (this: Ctx, orgId: string) {
  const numericalId = Number.parseInt(orgId);
  await tryDeleteOrgWithItemId(numericalId);
  await insertOrganisationWitItemId(numericalId);
});

Then(/^I am logged in as an admin "(.*)"$/, async function (this: Ctx, user: string) {
  const t = await this.getTestController();

  // this is crucial
  await clearCookies(t);
  await clearLocalStorage(t);

  await t.navigateTo(`${ BASE_URL }/organisations`);
  await userSelector(t, user);
});

// When(/^I click the save button$/, async function (this: Ctx) {
//   (await this.getTestController()).click(OrganisationPageModel.saveButton);
// });