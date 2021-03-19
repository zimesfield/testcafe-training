import { $ } from "../utils"
import {Selector} from "testcafe";

class OrganisationPageModel {
    title = $("[data-test=secondary-app-bar-title]");
    organisationSideLink = $("[data-test=side-nav-links-Organisations]");
    firstOrgList = $("[data-test=org-row]");

    acceptReviewChange = $("[data-test=accept-change]");
    rejectReviewChange = $("[data-test=reject-change]");

    //secondary app bar
    mainDetailsSection = $("[data-test=organisation-details-main-section]");
    ofqualDatesSection = $("[data-test=organisation-details-ofqual-section]");
    cceaDatesSection = $("[data-test=organisation-details-ccea-section]");
    addressSection = $("[data-test=organisation-details-address-section]");

    //secondary app bar
    mainDetailsHeader = $("[data-test=organisation-details-main-header]");
    ofqualDatesHeader = $("[data-test=organisation-details-ofqual-header]");
    cceaDatesHeader = $("[data-test=organisation-details-ccea-header]");
    addressHeader = $("[data-test=organisation-details-address-header]");

    //Meta data bar
    organisationsBreadcrumbLink = this.title.find("a").withText("Organisations");
    organisationsLegalNameField = $("[data-test=organisation-details-main-legalName]");
    organisationDetailsMainName = $("[data-test=organisation-details-main-name]");
    organisationDetailsMainAcronym = $("[data-test=organisation-details-main-acronym]");
    organisationsEmailField = $("[data-test=organisation-details-main-email]");
    organisationsWebsiteField = $("[data-test=organisation-details-main-website]");
    listOfStandardFeesField = $("[data-test=organisation-details-main-listOfStandardFeesUrl]");
    recognitionNumberField = $("[data-test=organisation-details-main-recognitionNumber]");
    companyNumberField = $("[data-test=organisation-details-main-companyNumber]");
    charityNumber= $("[name=charityNumber]");

    metadataEmailLink = $("[data-test=metadata-email]");
    metadataWebsiteLink = $("[data-test=metadata-website]");
    metadataListOfStandardFeesLink = $("[data-test=metadata-listOfStandardFees]");
    saveButton = $("[data-test=save-button]");
    saveDialogClose = $("[data-test=close-save-button]");
    reviewChangesButton = $("[data-test=review-changes-button]");
    closeChangeButton = $("[data-test=close-change-button]");
    activityBody = $('[data-test=activity-body]');


    //Ofqual Dates fields
    ofqualRecognisedOnDateField = $("[data-test=organisation-details-ofqual-ofqualRecognisedOnDate]");
    ofqualSurrenderedOnDateField = $("[data-test=organisation-details-ofqual-ofqualSurrenderedOnDate]");
    ofqualWithdrawnOnDateField = $("[data-test=organisation-details-ofqual-ofqualWithdrawnOnDate]");

    // CCEA Dates fields
    cceaRecognisedOnDateField = $("[data-test=organisation-details-ccea-cceaRecognisedOnDate]");
    cceaSurrenderedOnDateField = $("[data-test=organisation-details-ccea-cceaSurrenderedOnDate]");
    cceaWithdrawnOnDateField = $("[data-test=organisation-details-ccea-cceaWithdrawnOnDate]");

    //Org Address field
    addressLine1 = $("[data-test=organisation-details-address-line1]");
    addressLine2 = $("[data-test=organisation-details-address-line2]");
    addressLine3 = $("[data-test=organisation-details-address-line3]");
    addressLine4 = $("[data-test=organisation-details-address-line4]");
    addressPostcode = $("[data-test=organisation-details-address-postcode]");
    addressCountry = $("[datatest=organisation-details-address-country]");
    addressPhoneNumber = $("[data-test=organisation-details-address-phoneNumber]");

    async clickOrganisationsBreadcrumbLink(t: TestController) {
        await t.click(this.organisationsBreadcrumbLink);
    }
    async typeOrganisationsWebsiteField(t: TestController, description: string) {
        await t.typeText(this.organisationsWebsiteField, description, {replace:true});
    }
    async typeOrganisationsEmailField(t: TestController, description: string) {
        await t.typeText(this.organisationsEmailField, description, {replace:true});
    }
    async typeListOfStandardFeesField(t: TestController, description: string) {
        await t.typeText(this.listOfStandardFeesField, description, {replace:true});
    }
    async typeAddressLine1(t: TestController, description: string) {
        await t.typeText(this.addressLine1, description, {replace:true});
    }
    async typeAddressLine2(t: TestController, description: string) {
        await t.typeText(this.addressLine2, description, {replace:true});
    }
    async typeAddressLine3(t: TestController, description: string) {
        await t.typeText(this.addressLine3, description, {replace:true});
    }
    async typeAddressLine4(t: TestController, description: string) {
        await t.typeText(this.addressLine4, description, {replace:true});
    }
    async typeAddressPostcode(t: TestController, description: string) {
        await t.typeText(this.addressPostcode, description, {replace:true});
    }
    async typeAddressCountry(t: TestController, description: string) {
        await t.typeText(this.addressCountry, description, {replace:true});
    }
    async typeAddressPhoneNumber(t: TestController, description: string) {
        await t.typeText(this.addressPhoneNumber, description, {replace:true});
    }
    async clickSaveButton(t: TestController) {
        await t.click(this.saveButton);
    }
    async closeSaveDialog(t: TestController) {
      await t.click(this.saveDialogClose);
    }
    async clickMetadataEmailLink(t: TestController) {
        await t.click(this.metadataEmailLink);
    }
    async clickMetadataWebsiteLink(t: TestController) {
        await t.click(this.metadataWebsiteLink);
    }
    async clickMetadataListOfStandardFeesLink(t: TestController) {
        await t.click(this.metadataListOfStandardFeesLink);
    }

    async enterOrgDetails(t: { typeText: (arg0: Selector, arg1: string, arg2: { replace: boolean; }) => any; }, orgName: string, legalName: string, mainAcronym: string,
        companyNumber: string, recognitionNumber: string,) {

        await t.typeText(this.organisationDetailsMainName, orgName, {replace:true});
        await t.typeText(this.organisationsLegalNameField, legalName, {replace:true});
        await t.typeText(this.organisationDetailsMainAcronym, mainAcronym, {replace:true});
        await t.typeText(this.companyNumberField, companyNumber, {replace:true});
        await t.typeText(this.recognitionNumberField, recognitionNumber, {replace:true});
    }


    listSelector = async (t: TestController, selector: Selector) => {
        const mySelector = await $(selector);
        await t.click($(mySelector).parent(0));
    };

    dropDownSelector = async (t: TestController, selector: Selector, value: string) => {
        await this.listSelector(t, selector);
        await t.click($('ul[role=listbox]').child().withText(value));
    };

}

export default new OrganisationPageModel();
