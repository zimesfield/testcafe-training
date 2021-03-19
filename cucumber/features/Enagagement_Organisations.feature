
# Feature: Engagement workload during Recognition of PAO for Organization

#     # Background: Should delete record from the DB and create a new one

#     Scenario Outline:User should not see the recognition tab (negative test)
#         Given an organisation with the Item ID "90114" exists
#         And I am logged in as an admin "<AOUserAdmin>"
#         When I choose the organisation with the ID "90114"
#         Then I am on the correct organisation detail page "90114"
#         Then I should not see the recognition tab
#         Examples:
        
#             | ofqual.standarduser@ofqualprojects.onmicrosoft.com               |
#             | ofqual.qualadmin@ofqualprojects.onmicrosoft.com                  |
#             | ofqual.accreditationadmin@ofqualprojects.onmicrosoft.com         |
#             | ofqual.contactofqualadmin@ofqualprojects.onmicrosoft.com         |
#             | ofqual.submissionsadmin@ofqualprojects.onmicrosoft.com           |
#             | ofqual.enadmin@ofqualprojects.onmicrosoft.com                    |
#             | ofqual.regulatoryadmin@ofqualprojects.onmicrosoft.com            |
#             | ofqual.newsadmin@ofqualprojects.onmicrosoft.com                  |
#             | ofqual.expertsadmin@ofqualprojects.onmicrosoft.com               |
#             | ofqual.expertsevaluator@ofqualprojects.onmicrosoft.com           |
#             | ofqual.expertscommissioner@ofqualprojects.onmicrosoft.com        |
#             | ofqual.complaintscaseadmin@ofqualprojects.onmicrosoft.com        |
#             | ofqual.complaintscasecollaborator@ofqualprojects.onmicrosoft.com |
#             | ofqual.complaintscasereader@ofqualprojects.onmicrosoft.com       |
#             | ofqual.complaintscasehelpdesk@ofqualprojects.onmicrosoft.com     |
#             | ofqual.expansionadmin@ofqualprojects.onmicrosoft.com             |
#             | ofqual.expansionreader@ofqualprojects.onmicrosoft.com            |
#             | ccea.staff@ofqualprojects.onmicrosoft.com                        |
#             | ccea.qualadmin@ofqualprojects.onmicrosoft.com                    |
#             | ccea.accreditationadmin@ofqualprojects.onmicrosoft.com           |
#             | ccea.enadmin@ofqualprojects.onmicrosoft.com                      |

  
#     Scenario Outline: Initial Engagement Review
#         Given an organisation with the Item ID "90113" exists
#         When I logged in with a user with "<recognition_access>"
#         When I choose the organisation with the ID "90113"
#         Then I am on the correct organisation detail page "90113"
#         Then I accept the cookies if I see them
#         When I click on the Recognition tab
#         Then I enter the following recognition details "<caseNoteField>"
#         And I can select previously submitted applications
#         And I select an item from the qualificationTypeAppliedForList picklist and other
#         And I enter qualification type into the "<otherQualTypeField>"
#         And I select a date from the dateIntendingToApplyCalendarPicker
#         And I select a date from the followUpDateDatePicker
#         When I click the save button
#         # Then updated detail should be present on the activity channel
#         Examples:
#             | recognition_access                                     | caseNoteField | otherQualTypeField |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | Test Org      | Test Name          |
#             | ofqual.recognitionuser@ofqualprojects.onmicrosoft.com  | Test Org      | Test Name          |
#             | ofqual.itadmin@ofqualprojects.onmicrosoft.com          | Test Org      | Test Name          |

#     @skip
#     Scenario Outline: As an OfQual SR User I should be able to close a PAO
#         Given an organisation with the Item ID "90113" exists
#         When I logged in with a user with "<recognition_access>"
#         When I choose the organisation with the ID "90113"
#         Then I am on the correct organisation detail page "90113"
#         Then I accept the cookies if I see them
#         When I click on the Recognition tab
#         And I click the close button
#         Then a dialog should be displayed
#         And I select a reason from the reason(s) list
#         And I enter text in the "<noteField>"
#         And I select either "<cancelOrSave>"
#         Then my edited should be save successfully
#         Examples:
#             | recognition_access                            | noteField | cancelOrSave |
#             | ofqual.itadmin@ofqualprojects.onmicrosoft.com | Test Note | save         |
#             | ofqual.itadmin@ofqualprojects.onmicrosoft.com | Test Note | cancel       |


#     @skip
#     Scenario Outline: As an OfQual SR User I should be able to reopen a closed PAO
#         Given an organisation with the Item ID "90113" exists
#         When I logged in with a user with "<recognition_access>"
#         When I choose the organisation with the ID "90113"
#         Then I am on the correct organisation detail page "90113"
#         Then I accept the cookies if I see them
#         When I click on the Recognition tab
#         And I click on the reopen button
#         Then a dialog should be open
#         And I enter text in the "<noteField>"
#         And I select either "<cancelOrSave>"
#         Then an item should be added in the activity field
#         And I see the correct "<username>"
#         And I see the date time of the save
#         And I see the note that was added in the "<noteField>"
#         Examples:
#             | recognition_access                            | noteField | cancelOrSave | username |
#             | ofqual.itadmin@ofqualprojects.onmicrosoft.com | Test Note | save         |          |
#             | ofqual.itadmin@ofqualprojects.onmicrosoft.com | Test Note | cancel       |          |

#     @skip
#     Scenario Outline: As an Ofqual SR user, I can create an event for Engagement with PAO
#         Given an organisation with the Item ID "90113" exists
#         When I logged in with a user with "<recognition_access>"
#         When I choose the organisation with the ID "90113"
#         Then I am on the correct organisation detail page "90113"
#         Then I accept the cookies if I see them
#         When I click on the Recognition tab
#         And I click on the add event button
#         And the a dialog is displayed
#         And I select an eventTypeList from the event list
#         And I select a date from the date calendar picker
#         And I select a means of communications from the communication list
#         And I select either "<cancelOrSave>"
#         Then an item should be added in the activity field
#         And I see the correct "<username>"
#         And I see the date time of the save
#         Then the eventTypeList list should be displayed
#         Then selected date should be displayed
#         Then the means of communicate should be displayed
#         Then I shuold see the record completion button under the item
#         Examples:
#             | recognition_access | cancelOrSave | username |
#             | Value 1            | Value 2      | Value 3  |

#     @skip
#     Scenario Outline: As an Ofqual SR user, I can record that an Engagement with PAO was completed
#         Given an organisation with the Item ID "90113" exists
#         When I logged in with a user with "<recognition_access>"
#         When I choose the organisation with the ID "90113"
#         Then I am on the correct organisation detail page "90113"
#         Then I accept the cookies if I see them
#         When I click on the Recognition tab
#         When I click on record completion button
#         Then a dialog should appear
#         And I can check the PAO attended checkbox
#         And I can enter text in the "<noteField>"
#         And I add an attach(s)
#         When I click "<savecancel>"
#         Then an item should be added in the activity field
#         And I see the correct "<username>"
#         And I see the date time of the save
#         Then the eventTypeList list should be displayed
#         Then selected date should be displayed
#         Then the means of communicate should be displayed
#         Then the PAO attended checkbox should be displayed
#         Then the note in the noteField should be displayed
#         Then the attachement should displayed
#         Then I should be able to download any attachement
#         Examples:
#             | recognition_access | noteField | savecancel | username |
#             | Value 1            | Value 2   | Value 3    |          |

#     @skip
#     Scenario Outline: As an OfQual SR User I should be able to communicate via responses activities
#         Given an organisation with the Item ID "90113" exists
#         When I logged in with a user with "<recognition_access>"
#         When I choose the organisation with the ID "90113"
#         Then I am on the correct organisation detail page "90113"
#         Then I accept the cookies if I see them
#         When I click on the Recognition tab
#         When I click on the send a message button
#         Then a dialog should appear
#         And I can enter text in the "<noteField>"
#         And I add an attach(s)
#         When I click "<savecancel>"
#         Then an item should be added in the activity field
#         And I see the correct "<username>"
#         And I see the date time of the save
#         Then the eventTypeList list should be displayed
#         Then selected date should be displayed
#         Then the means of communicate should be displayed
#         Then the PAO attended checkbox should be displayed
#         Then the note in the noteField should be displayed
#         Then the attachement should displayed
#         Then I should be able to download any attachement
#             | recognition_access | noteField | savecancel | username |
#             | Value 1            | Value 2   | Value 3    |          |

#     @skip
#     Scenario Outline: As an OfQual SR User I should be able to release the application form so that a PAO can complete their recognition application
#         Given an organisation with the Item ID "90113" exists
#         When I logged in with a user with "<recognition_access>"
#         When I choose the organisation with the ID "90113"
#         Then I am on the correct organisation detail page "90113"
#         Then I accept the cookies if I see them
#         When I click on the Recognition tab
#         When I click on the release application button
#         Then an item should be added in the activity field
#         And I see the correct "<username>"
#         And I see the date time of the save
#         Examples:
#             | recognition_access | username |
#             | Value 1            | Value 2  | 



