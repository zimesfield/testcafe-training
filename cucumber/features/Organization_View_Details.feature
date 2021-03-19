
Feature: Organisation View Details (Approval/Rejection)

  I want to Approve / reject Organization details.

  Scenario Outline: Approve Organization Details
    Given I am on the organisations page
    When I choose the organisation with the ID "75402"
    Then I am on the correct organisation detail page "75402"
    Then I accept the cookies if I see them
    When I enter organisation details "<orgName>" "<legalName>" "<mainAcronym>" "<recognitionNumber>" "<companyNumber>"
    When I click the save button
    Then I should see "Some Changes Require Approval" modal displayed with all amended fields
    When I close the dialogbox by saving
    And I click the review pending changes on the bottom of the screen
    And I update review "<status>"
    And I close the dialogbox
    Examples:
      | orgName   | legalName  | mainAcronym | companyNumber | recognitionNumber | status  |
      | Test Org  | Test Name  | CCEA        | 12345         | 00123             | approve |
      | Test2 Org | Tet2 Name  | TSSA        | 00123         | 00123             | reject  |
      | Test 3    | Test3 Name | CCEA        | 12345         | 00123             | approve |

  Scenario: Approve and Reject Organization Details
     Given I am on the organisations page
     When I choose the organisation with the ID "75402"
     Then I am on the correct organisation detail page "75402"
     Then I accept the cookies if I see them
     Then I fill in the organisation details
       | orgName  | legalName | mainAcronym | companyNumber | recognitionNumber |
       | Test Org | Test Name | CCEA        | 12345         | 00123             |
     When I click the save button
     Then I should see "Some Changes Require Approval" modal displayed with all amended fields
     When I close the dialogbox by saving
     And I click the review pending changes on the bottom of the screen
     And I approve some amended fields
     And I rejects some amended fields
     And I close the dialogbox

  Scenario: Approve Organization Details
     Given I am on the organisations page
     When I choose the organisation with the ID "75402"
     Then I am on the correct organisation detail page "75402"
     Then I accept the cookies if I see them
     Then I fill in the organization details

  Scenario Outline: Amend Organisation Details
     Given I am on the organisations page
     When I choose the organisation with the ID "75402"
     Then I am on the correct organisation detail page "75402"
     Then I accept the cookies if I see them
     When I amend the following field "<website>" "<email>" "<ListOfStandardFees>" "<addressLine1>" "<addressLine2>" "<addressLine3>" "<addressLine4>" "<postCode>" "<country>" "<phoneNumber>"
     When I click the save button
     Examples:
       | website       | email              | ListOfStandardFees | addressLine1        | addressLine2 | addressLine3 | addressLine4 | postCode | country             | phoneNumber     | status  |
       | www.googe.com | test@ofqual.gov.uk | test test test     | 101 test av, London | London       | address 3    | address 4    | SE4 7TT  | United Kingdom      | +44 79809988878 | approve |


  Scenario: Amend Organisation email Details
     Given I am on the organisations page
     When I choose the organisation with the ID "75402"
     Then I am on the correct organisation detail page "75402"
     Then I accept the cookies if I see them
     When I amend the email field
       | email          |
       | test@email.com |
     When I click the save button

  Scenario: Amend Organisation ListOfStandardFees Details
     Given I am on the organisations page
     When I choose the organisation with the ID "75402"
     Then I am on the correct organisation detail page "75402"
     Then I accept the cookies if I see them
     And I amend the ListOfStandardFees field
       | ListOfStandardFees |
       | Example            |
     When I click the save button

  Scenario: Amend Organisation postCode Details
     Given I am on the organisations page
     When I choose the organisation with the ID "75402"
     Then I am on the correct organisation detail page "75402"
     Then I accept the cookies if I see them
     And I amend the postCode field
       | postCode       |
       | www.ggogle.com |
     When I click the save button

  Scenario: I can navigate to link within url - Website
     Given I am on the organisations page
     When I choose the organisation with the ID "75402"
     Then I am on the correct organisation detail page "75402"
     Then I accept the cookies if I see them
     When I click on the metaDataWebsiteLink

  Scenario: I can navigate to link within url - list of standard fees
     Given I am on the organisations page
     When I choose the organisation with the ID "75402"
     Then I am on the correct organisation detail page "75402"
     Then I accept the cookies if I see them
     When I click on the metadataListOfStandardFeesLink

