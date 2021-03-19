import { Given, When, Then } from '@cucumber/cucumber';

import { Ctx } from '../support/world';
import { userSelector } from '../utils/helper';
// import { getLocation } from '../utils/browser';
import { clearCookies, clearLocalStorage, getLocation, localStorageGet, localStorageSet } from '../utils/browser';
import { BASE_URL } from '../environment';
import { $ } from '../utils';
import { tryDeleteOrgWithItemId, insertOrganisationWitItemId } from '../utils/dbUtil';
import OrganisationPageModel from '../../testcafe/page-models/OrganisationViewDetails';
import OrganisationListPageModel from '../page_objects/OrganisationList';
import OrganisationList from '../page_objects/OrganisationList';
import {delay} from "q";

enum LocalStorageKeys {
  ORG_NAME = 'organisation-name',
  LEGAL_NAME = 'legal-name',
  MAIN_ACRONYM = 'main-acronym',
  RECOGNITION_NUMBER = 'recognition-number',
  COMPANY_NUMBER = 'company-number'
}


When(/^I select the "(.*)" selector$/, async function (this: Ctx, rowsPerPageDialog: string) {
    const t = await this.getTestController();
    switch (rowsPerPageDialog) {
        case '25':
            await t.click(OrganisationList.pageSizeFilter);
            await t.click(OrganisationList.pageSizeMenuItem25);
            break;
        case '50':
            await t.click(OrganisationList.pageSizeFilter);
            await t.click(OrganisationList.pageSizeMenuItem50);
            break;
        case '100':
            await t.click(OrganisationList.pageSizeFilter);
            await t.click(OrganisationList.pageSizeFilter.withText('100'));
            break;
    }
});

Then(/^I see the "([^"]*)" on the screen$/, async function (this: Ctx, status: string) {
    console.log(status)
    // const t = await this.getTestController();
    // await t.click(OrganisationList.orgRow);
    // const approve = async () => t.click(OrganisationPageModel.acceptReviewChange);
    // const reject = async () => t.click(OrganisationPageModel.rejectReviewChange);
});

Then(/^I navigate through the page using the selector and verify the pages$/, async function (this: Ctx) {
    const t = await this.getTestController();

    await t.click(OrganisationList.pageRight);
    await t.expect(getLocation(t)).contains(`${BASE_URL}/organisations?page=1`);

    await t.click(OrganisationList.pageLast);
    await t.expect(getLocation(t)).contains(`${BASE_URL}/organisations?page=8`);

    await t.click(OrganisationList.pageLeft);
    await t.expect(getLocation(t)).contains(`${BASE_URL}/organisations?page=7`);

    await t.click(OrganisationList.pageFirst);
    await t.expect(getLocation(t)).contains(`${BASE_URL}/organisations`);

});

When(/^I click the order by button$/, async function (this: Ctx) {
    const t = await this.getTestController();

    await t.click(OrganisationList.orderFilter);

});

When(/^I click "([^"]*)" selector$/, async function (this: Ctx, selector: string) {
    const t = await this.getTestController();

    switch (selector) {
        case 'Legal Name':
            console.log(selector);
            await t.click(OrganisationList.menuItem.withText(selector));
            await t.expect(getLocation(t)).contains(`${BASE_URL}/organisations`);
            break;
        case 'Acronym':
            await t.click(OrganisationList.menuItem.withText(selector));
            await t.expect(getLocation(t)).contains(`${BASE_URL}/organisations`);
            break;
    }

});

When(/^I search by "([^"]*)"$/, async function (this: Ctx, query: string) {
    const t = await this.getTestController();
    await t.click(OrganisationList.orgSearchFilter);
    await t.typeText(OrganisationList.orgSearchFilter,query, {replace:true})
});

When(/^The organisations list contains "([^"]*)"$/, async function (this: Ctx, query: string) {
  const t = await this.getTestController();

  await t.expect(getLocation(t)).contains(`${BASE_URL}/organisations?search=${encodeURIComponent(query)}`);
});

