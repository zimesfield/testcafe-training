# Feature: Recognition workload during Recognition of PAO for Organization

#     # Background: Should delete record from the DB and create a new one

#     # Logic for Scope routes below
#     # Included/Excluded field - Included route allows all 3 RegPermTypes, Excluded only allows Specific Qualification Description
#     # Regulatory Permission Type field - Regulatory Qualification Type  = only Qualification Type Field, Level Field and Sector Subject Area Field unless EPA (Appr Standard Field) / Tech Qual (Level and TQ subject Field)
#     #                                  - All Qualifications subject...  = only Level Field and Sector Subject Area Field
#     #                                  - Specific Qualification Desc... = only Qualification Description field (free text field)


#     Scenario Outline: As an Ofqual Recognition Admin, I should be able to review a recognition application from a PAO
#         Given an organisation with the Item ID "90113" exists
#         When I logged in with a user with "<recognition_access>"
#         When I choose the organisation with the ID "90113"
#         Then I am on the correct organisation detail page "90113"
#         Then I accept the cookies if I see them
#         When I click on the Recognition tab
#         When I click on the application in the applications area
#         Then i should navigate to the application view
#         And I can check there is text in the "<textFieldA.4>" text field
#         And I can check there is text in the "<textFieldA.5>" text field
#         And I can check there is text in the "<textFieldA.6>" text field
#         And I can check there is text in the "<textFieldB.1>" text field
#         And I can check there is text in the "<textFieldB.2>" text field
#         And I can check there is text in the "<textFieldC.1(a)>" text field
#         And I can check there is text in the "<textFieldC.1(b)>" text field
#         And I can check there is text in the "<textFieldD.1(a)>" text field
#         And I can check there is text in the "<textFieldD.1(b)>" text field
#         And I can check there is text in the "<textFieldD.1(c)>" text field
#         And i can check the "<conditionsOfApplicationAccepted>" checkbox has been selected
#         And I can check there is text in the "<D.1(c)>" text field
#         And I can check the "<numberOfSupportingDocuments>" field contains "<x number of attachments>"
#         And I view the attach(s)
#         And I can check the "<agreeToContactOtherBodies>" checkbox has been selected
#         And I can check the "<agreeToContactOtherOrganisations>" checkbox has been selected
#         And I can check the "<proposedResponsibleOfficer>" field contains text
#         And I can check the "<applicationSubmissionDate>" equals "<x date>"
#         Examples:
#             | recognition_access                                     | noteField | savecancel | username |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | Test Note | save       | test699  |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | Test Note | cancel     | test699  |


#     Scenario Outline: As an Ofqual Recognition Admin, I should be able to communicate with the Prospective AO
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
#         Examples:
#             | recognition_access                                     | noteField | savecancel | username |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | Test Note | save       | test699  |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | Test Note | cancel     | test699  |

#     Scenario Outline: As an Ofqual Recognition Admin, I should be able to complete the Application Review for a PAO - Assign Reviewers
#         Given an organisation with the Item ID "90113" exists
#         When I logged in with a user with "<recognition_access>"
#         When I choose the organisation with the ID "90113"
#         Then I am on the correct organisation detail page "90113"
#         Then I accept the cookies if I see them
#         When I click on the Recognition tab
#         When I click on "<assignC.1(b)Reviewer>" "<assignDReviewer>" "<assignMainReviewer>" assign button
#         Then a dialogue appears
#         And I can select a user
#         And I should be able to cancel_assign ````
#         Then the selected user should be added to the reviewer field
#         Examples:
#             | recognition_access                                     | assignC.1(b)Reviewer                                   | assignDReviewer                                        | assignMainReviewer                                     | cancel/assign |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | ofqual.recognitionuser@ofqualprojects.onmicrosoft.com  | ofqual.itadmin@ofqualprojects.onmicrosoft.com          | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | cancel        |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | ofqual.itadmin@ofqualprojects.onmicrosoft.com          | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | ofqual.recognitionuser@ofqualprojects.onmicrosoft.com  | assign        |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | ofqual.recognitionuser@ofqualprojects.onmicrosoft.com  | ofqual.itadmin@ofqualprojects.onmicrosoft.com          | assign        |

#     Scenario Outline: As an Ofqual Recognition Admin, I should be able to complete the Application Review for a PAO - Application Review form dates
#         Given an organisation with the Item ID "90113" exists
#         When I logged in with a user with "<recognition_access>"
#         When I choose the organisation with the ID "90113"
#         Then I am on the correct organisation detail page "90113"
#         Then I accept the cookies if I see them
#         When I click on the Recognition tab
#         When I click on "<calendarPickerC.1(b)ReviewCompleted>" "<calendarPickerDReviewCompleted>" "<calendarPickerReviewCompleted>" "<calendarPickerReviewMeeting>" "<calendarPickerPanelMeeting>" "<calendarPickerDecisionLetter>" calendar picker button
#         Then a dialogue appears
#         And I can select a date_time
#         And I should be able to cancel_add ````
#         Then the selected date_time should be added to the date of review field
#         Examples:
#             | recognition_access                                     | calendarPickerC.1(b)ReviewCompleted | calendarPickerDReviewCompleted | calendarPickerReviewCompleted | calendarPickerReviewMeeting | calendarPickerPanelMeeting | calendarPickerDecisionLetter | cancel/add |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | -                                   | -                              | -                             | -                           | -                          | -                            | cancel     |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | -                                   | -                              | -                             | -                           | -                          | -                            | add        |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | -                                   | -                              | -                             | -                           | -                          | -                            | add        |

#     Scenario Outline: As an Ofqual Recognition Admin, I should be able to complete the Application Review for a PAO - Application Review form fields and attachments
#         Given an organisation with the Item ID "90113" exists
#         When I logged in with a user with "<recognition_access>"
#         When I choose the organisation with the ID "90113"
#         Then I am on the correct organisation detail page "90113"
#         Then I accept the cookies if I see them
#         When I click on the Recognition tab
#         When I click on "<reviewMeetingOutcomeField>" "<panelDecisionField>"
#         And I add an attach(s)
#         Then I can see outcomes in field
#         And the attachment(s) should displayed
#         Examples:
#             | recognition_access                                     | reviewMeetingOutcomeField | panelDecisionField |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | Value 2                   | Value 3            |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | Value 3                   | Value 2            |

#     Scenario Outline: As an Ofqual Recognition Admin, I should be able to complete the Application Review for a PAO - Feedback area
#         Given an organisation with the Item ID "90113" exists
#         When I logged in with a user with "<recognition_access>"
#         When I choose the organisation with the ID "90113"
#         Then I am on the correct organisation detail page "90113"
#         Then I accept the cookies if I see them
#         When I click on the Recognition tab
#         When I click on "<feedbackMeetingRequestedCheckbox>" "<calendarPickerDateOfFeedbackMeeting>" "<feedbackMeetingNotesField>"
#         Then I add an attach(s)
#         Then I can see outcomes in field
#         And the attachment(s) should displayed
#         Examples:
#             | recognition_access                                     | feedbackMeetingRequestedCheckbox | calendarPickerDateOfFeedbackMeeting | feedbackMeetingNotesField |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | checked                          | -                                   | Lorem Ipsum               |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | unchecked                        | NA                                  | NA                        |

#     Scenario Outline: As an Ofqual Recognition Admin, I should be able to add scopes to be recognised for to a prospective AO recognition - Example: Included/RegQualType/AEA/Lvl1/02.1 Science
#         Given an organisation with the Item ID "90113" exists
#         When I logged in with a user with "<recognition_access>"
#         When I choose the organisation with the ID "90113"
#         Then I am on the correct organisation detail page "90113"
#         Then I accept the cookies if I see them
#         When I click on the Scope Applications tab
#         When I can click on the addScopeButton
#         Then a dialog should appear
#         And I can select a value from the "<includedExcludedField>" "<regulatoryPermissionTypeField>" "<qualificationTypeField>" "<levelField>" "<sectorSubjectAreaField>" field
#         And I should be able to cancel_clear_addscope ````
#         Then the selected Scope should be added to the Scope list
#         Examples:
#             | recognition_access                                     | includedExcludedField | regulatoryPermissionTypeField | qualificationTypeField   | levelField | sectorSubjectAreaField |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | Included              | Regulatory Qualification Type | Advanced Extension Award | Level 1    | 02.1 Science           |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | Included              | Regulatory Qualification Type | Advanced Extension Award | Level 2    | 02.1 Science           |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | Included              | Regulatory Qualification Type | Advanced Extension Award | Level 3    | 02.1 Science           |

#     Scenario Outline: As an Ofqual Recognition Admin, I should be able to add scopes to be recognised for to a prospective AO recognition - Example: Included/RegQualType/EPA/Actuary
#         Given an organisation with the Item ID "90113" exists
#         When I logged in with a user with "<recognition_access>"
#         When I choose the organisation with the ID "90113"
#         Then I am on the correct organisation detail page "90113"
#         Then I accept the cookies if I see them
#         When I click on the Scope Applications tab
#         When i can click on the addScopeButton
#         Then a dialog should appear
#         And I can select a value from the "<includedExcludedField>" "<regulatoryPermissionTypeField>" "<qualificationTypeField>" "<apprenticeshipStandardField>" field
#         And I should be able to cancel_clear_addscope
#         Then the selected Scope should be added to the Scope list
#         Examples:
#             | recognition_access                                     | includedExcludedField | regulatoryPermissionTypeField | qualificationTypeField | apprenticeshipStandardField | cancel/clear/addscope |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | Included              | Regulatory Qualification Type | End-Point-Assessment   | Actuary                     | addscope              |


#     Scenario Outline: As an Ofqual Recognition Admin, I should be able to add scopes to be recognised for to a prospective AO recognition - Example: Included/RegQualType/TQ/Level 2/Accountancy
#         Given an organisation with the Item ID "90113" exists
#         When I logged in with a user with "<recognition_access>"
#         When I choose the organisation with the ID "90113"
#         Then I am on the correct organisation detail page "90113"
#         Then I accept the cookies if I see them
#         When I click on the Scope Applications tab
#         When I can click on the addScopeButton
#         Then a dialog should appear
#         And I can select a value from the "<includedExcludedField>" "<regulatoryPermissionTypeField>" "<qualificationTypeField>" "<levelField>" "<technicalQualificationSubjectField>" field
#         And I should be able to cancel_clear_addscope
#         Then the selected Scope should be added to the Scope list
#         Examples:
#             | recognition_access                                     | includedExcludedField | regulatoryPermissionTypeField | qualificationTypeField  | levelField | technicalQualificationSubjectField | cancel/clear/addscope |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | Included              | Regulatory Qualification Type | Technical Qualification | level 2    | Accountancy                        | addscope              |

#     Scenario Outline: As an Ofqual Recognition Admin, I should be able to add scopes to be recognised for to a prospective AO recognition - Example: Included/AllQualsSubject/Level 3/03.1 Agriculture
#         Given an organisation with the Item ID "90113" exists
#         When I logged in with a user with "<recognition_access>"
#         When I choose the organisation with the ID "90113"
#         Then I am on the correct organisation detail page "90113"
#         Then I accept the cookies if I see them
#         When I click on the Scope Applications tab
#         When i can click on the addScopeButton
#         Then a dialog should appear
#         And I can select a value from the "<includedExcludedField>" "<regulatoryPermissionTypeField>" "<levelField>" "<sectorSubjectAreaField>" field
#         And I should be able to cancel_clear_addscope
#         Then the selected Scope should be added to the Scope list
#         Examples:
#             | recognition_access                                     | includedExcludedField | regulatoryPermissionTypeField | levelField | sectorSubjectAreaField      | cancel/clear/addscope |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | Included              | All Qualification Subjects    | Entry 1    | 01.1 Medicine and Dentistry | cancel                |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | Included              | All Qualification Subjects    | Level 1    | 01.3 Health and social care | clear                 |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | Included              | All Qualification Subjects    | Level 2    | 01.4 Public services        | addScope              |



#     Scenario Outline: As an Ofqual Recognition Admin, I should be able to add scopes to be recognised for to a prospective AO recognition - Example: Included/SpecificQualDesc/Lorem Ipsum
#         Given an organisation with the Item ID "90113" exists
#         When I logged in with a user with "<recognition_access>"
#         When I choose the organisation with the ID "90113"
#         Then I am on the correct organisation detail page "90113"
#         Then I accept the cookies if I see them
#         When I click on the Scope Applications tab
#         When i can click on the addScopeButton
#         Then a dialog should appear
#         And I can select a value from the "<includedExcludedField>" "<regulatoryPermissionTypeField>" "<qualificationDescriptionField>" field
#         And I should be able to cancel_clear_addscope
#         Then the selected Scope should be added to the Scope list
#         Examples:
#             | recognition_access                                     | includedExcludedField | regulatoryPermissionTypeField      | qualificationDescriptionField | cancel/clear/addscope |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | Included              | Specific Qualification Description | Lorem Ipsum                   | cancel                |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | Included              | Specific Qualification Description | Lorem Ipsum                   | clear                 |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | Included              | Specific Qualification Description | Lorem Ipsum                   | addScope              |


#     Scenario Outline: As an Ofqual Recognition Admin, I should be able to add scopes to be recognised for to a prospective AO recognition - Example: Excluded/SpecificQualDesc/Lorem Ipsum
#         Given an organisation with the Item ID "90113" exists
#         When I logged in with a user with "<recognition_access>"
#         When I choose the organisation with the ID "90113"
#         Then I am on the correct organisation detail page "90113"
#         Then I accept the cookies if I see them
#         When I click on the Scope Applications tab
#         When i can click on the addScopeButton
#         Then a dialog should appear
#         And I can select a value from the "<includedExcludedField>" "<regulatoryPermissionTypeField>" "<qualificationDescriptionField>" field
#         And I should be able to cancel_clear_addscope
#         Then the selected Scope should be added to the Scope list
#         Examples:
#             | recognition_access                                     | includedExcludedField | regulatoryPermissionTypeField      | qualificationDescriptionField | cancel/clear/addscope |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | Excluded              | Specific Qualification Description | Lorem Ipsum                   | cancel                |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | Excluded              | Specific Qualification Description | Lorem Ipsum                   | clear                 |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | Excluded              | Specific Qualification Description | Lorem Ipsum                   | addScope              |


#     # Logic for test
#     Scenario Outline: As an Ofqual Recognition Admin, I should be able to approve, reject or withdraw a recognition application
#         Given an organisation with the Item ID "90113" exists
#         When I logged in with a user with "<recognition_access>"
#         When I choose the organisation with the ID "90113"
#         Then I am on the correct organisation detail page "90113"
#         Then I accept the cookies if I see them
#         When I click on the Recognition tab
#         When I click on the application in the applications area
#         Then i should navigate to the application view
#         When i click on the "<approve/reject/withdraw>" button
#         Then a dialog should appear
#         And I select a date from the date canlendar picker
#         When I click "<cancel/approve>" button
#         Then the selected PAO should be recognised from selected date
#         Examples:
#             | recognition_access                                     | approve/reject/withdraw | cancel/approve |
#             | ofqual.recognitionadmin@ofqualprojects.onmicrosoft.com | Value 2                 | Value 3        |


#     Scenario Outline: As an Ofqual Standards user, I should be able to see the recognition details of an approved AO
#         Given an organisation with the Item ID "90114" exists
#         And I am logged in as an admin "<AOUserAdmin>"
#         When I choose the organisation with the ID "90114"
#         Then I am on the correct organisation detail page "90114"
#         Then I should see the recognition tab
#         And I can click on the recognition tab
#         Then I can view the Engagement form
#         And I can view the Recognition form
#         Examples:
#             | AOUserAdmin                                                      |
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