import * as sql from "mssql";

const DB_CONN = process.env.TEST_DB_CONN || "";

export const tryDeleteOrgWithItemId = async (itemId: number) => {
  const client = await new sql.ConnectionPool(DB_CONN, (err) => {
    if (err) throw err;
  }).connect();

  try {
    const request = new sql.Request(client);
    request.input("ItemId", itemId);
    await new Promise<void>((resolve, reject) => {
      request.query(`
        DELETE FROM [organisation].[OrganisationQualTypeToApplyFor]
        WHERE OrgId IN (SELECT Id FROM [organisation].[Organisation] WHERE ItemId = @ItemId)

        DELETE FROM [organisation].[OrganisationChange]
        WHERE OrgId IN (SELECT Id FROM [organisation].[Organisation] WHERE ItemId = @ItemId)

        DELETE FROM [organisation].[OrganisationRecognitionUser]
        WHERE OrganisationId IN (SELECT Id FROM [organisation].[Organisation] WHERE ItemId = @ItemId)

        DELETE FROM [organisation].[Organisation] WHERE [ItemId] = @ItemId`, 
        (err, _) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
  } catch (err) {
    console.log("Something went wrong deleting the organisation - it may not exist");
  }
}

export const insertOrganisationWitItemId = async (itemId: number) => {
  const org = createTestOrgObj({ itemId: itemId });
  const client = await new sql.ConnectionPool(DB_CONN, (err) => {
    if (err) throw err;
  }).connect();

  try {
    const request = createInsertOrgRequest(client, org);
    await new Promise<void>((resolve, reject) => {
      request.query(insertOrgStatement, (err, _) => {
        client.close();
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  } catch (err) {
    console.error("Something went wrong inserting the organisation");
    throw err;
  }
}

const createInsertOrgRequest = (conn: sql.ConnectionPool, org: { [key: string]: any }) => {
  const r = new sql.Request(conn);

  const toPascalCase = (s: string) => {
    return s.replace(
      /(\w)(.*)/g,
      function(_,g1,g2){ return g1.toUpperCase() + g2; }
    );
  };

  Object.keys(org).forEach(k => {
    r.input(toPascalCase(k), org[k]);
  });
  return r;
}

const insertOrgStatement =  `INSERT INTO [organisation].[Organisation]
  ([Accreditation]
  ,[Acronym]
  ,[Email]
  ,[LegalName]
  ,[ListOfStandardFeesUrl]
  ,[CompanyNumber]
  ,[ItemId]
  ,[Name]
  ,[Website]
  ,[UpdateStatus]
  ,[OfqualRecognisedOnDate]
  ,[CceaRecognisedOnDate]
  ,[OfqualSurrenderedDate]
  ,[OfqualWithdrawnOnDate]
  ,[CceaWithdrawnOnDate]
  ,[CreatedByUpn]
  ,[CreatedByDisplayName]
  ,[ModifiedByUpn]
  ,[ModifiedByDisplayName]
  ,[AssignedToUpn]
  ,[AssignedToDisplayName]
  ,[CreatedDate]
  ,[ModifiedDate]
  ,[RecognitionNumber]
  ,[Line1]
  ,[Line2]
  ,[Line3]
  ,[Line4]
  ,[PostCode]
  ,[Country]
  ,[PhoneNumber]
  ,[CceaSurrenderedDate]
  ,[HasCompanyNumber]
  ,[HasCharityNumber]
  ,[CharityNumber]
  ,[IsOtherUkLegalEntity]
  ,[OtherLegalEntityType]
  ,[IsRegisteredInOtherCountry]
  ,[OtherCountryOfRegistration]
  ,[OtherCountryIdentifier]
  ,[IsIndividualOrPartnership]
  ,[DateOfIncorporation]
  ,[PendingRecognition]
  ,[RecognitionApplicationReleaseDate]
  ,[EngagementLastActivatedDate]
  ,[EngagementLastClosedDate]
  ,[EngagementCaseNotes]
  ,[EngagementPerceivedUnderstanding]
  ,[EngagementFollowUpDate]
  ,[IsOnRoEPAOs]
  ,[HasSubmittedApplicationBefore]
  ,[QualTypeIntendingToApplyForOther]
  ,[ContactTitle]
  ,[ContactFirstName]
  ,[ContactSurname]
  ,[ContactEmail]
  ,[ContactRoleInOrg]
  ,[DateIntendingToApply])
VALUES
  (@Accreditation
  ,@Acronym
  ,@Email
  ,@LegalName
  ,@ListOfStandardFeesUrl
  ,@CompanyNumber
  ,@ItemId
  ,@Name
  ,@Website
  ,@UpdateStatus
  ,@OfqualRecognisedOnDate
  ,@CceaRecognisedOnDate
  ,@OfqualSurrenderedDate
  ,@OfqualWithdrawnOnDate
  ,@CceaWithdrawnOnDate
  ,@CreatedByUpn
  ,@CreatedByDisplayName
  ,@ModifiedByUpn
  ,@ModifiedByDisplayName
  ,@AssignedToUpn
  ,@AssignedToDisplayName
  ,@CreatedDate
  ,@ModifiedDate
  ,@RecognitionNumber
  ,@Line1
  ,@Line2
  ,@Line3
  ,@Line4
  ,@PostCode
  ,@Country
  ,@PhoneNumber
  ,@CceaSurrenderedDate
  ,@HasCompanyNumber
  ,@HasCharityNumber
  ,@CharityNumber
  ,@IsOtherUkLegalEntity
  ,@OtherLegalEntityType
  ,@IsRegisteredInOtherCountry
  ,@OtherCountryOfRegistration
  ,@OtherCountryIdentifier
  ,@IsIndividualOrPartnership
  ,@DateOfIncorporation
  ,@PendingRecognition
  ,@RecognitionApplicationReleaseDate
  ,@EngagementLastActivatedDate
  ,@EngagementLastClosedDate
  ,@EngagementCaseNotes
  ,@EngagementPerceivedUnderstanding
  ,@EngagementFollowUpDate
  ,@IsOnRoEPAOs
  ,@HasSubmittedApplicationBefore
  ,@QualTypeIntendingToApplyForOther
  ,@ContactTitle
  ,@ContactFirstName
  ,@ContactSurname
  ,@ContactEmail
  ,@ContactRoleInOrg
  ,@DateIntendingToApply)`;

const createTestOrgObj = (params: { [key: string]: any }) => {
  return Object.assign({}, generateBaseOrg(), params);
}

const generateBaseOrg = () => {
  const dtNow = new Date();
  return {
    accreditation: false,
    acronym: `TST${dtNow.getDate()}`.substr(0,10),
    email: `test-${dtNow.getDate()}@c.com`,
    legalName: `AT ORG ${dtNow.getDate()}`,
    listOfStandardFeesUrl: "https://www.google.com",
    companyNumber: "12345",
    itemId: 9991,
    name: `AT ORG ${dtNow.getDate()}`,
    website: "https://www.google.com",
    updateStatus: null,
    ofqualRecognisedOnDate: null,
    cceaRecognisedOnDate: null,
    ofqualSurrenderedDate: null,
    cceaSurrenderedDate: null,
    ofqualWithdrawnOnDate: null,
    cceaWithdrawnOnDate: null,
    createdByUpn: "joe.ingledew@ofqual.gov.uk",
    createdByDisplayName: "Joe Ingledew",
    modifiedByUpn: "joe.ingledew@ofqual.gov.uk",
    modifiedByDisplayName: "Joe Ingledew",
    assignedToUpn: null,
    assignedToDisplayName: null,
    createdDate: dtNow.toISOString(),
    modifiedDate: dtNow.toISOString(),
    recognitionNumber: null,
    line1: "line1",
    line2: "line2",
    line3: "line3",
    line4: "line4",
    postCode: "CV1 2AB",
    country: "United Kingdom",
    phoneNumber: "01234567890",
    hasCompanyNumber: true,
    hasCharityNumber: false,
    charityNumber: null,
    isOtherUkLegalEntity: false,
    otherUkLegalEntityType: null,
    isRegisteredInOtherCountry: false,
    otherCountryOfRegistration: null,
    otherCountryIdentifier: null,
    isIndividualOrPartnership: false,
    dateOfIncorporation: dtNow.toISOString(),
    pendingRecognition: true,
    recognitionApplicationReleaseDate: null,
    engagementLastActivatedDate: dtNow.toISOString(),
    engagementLastClosedDate: null,
    engagementCaseNotes: null,
    engagementPerceivedUnderstanding: null,
    engagementFollowUpDate: null,
    isOnRoEPAOs: null,
    hasSubmittedApplicationBefore: null,
    qualTypeIntendingToApplyForOther: null,
    contactTitle: 1,
    contactFirstName: "Firstname",
    contactSurname: "Surname",
    contactEmail: "ab@c.com",
    contactRoleInOrg: "RO",
    dateIntendingToApply: null,
    otherLegalEntityType: null,
  }
}