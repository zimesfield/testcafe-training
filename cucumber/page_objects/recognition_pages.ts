import { $ } from '../utils/selector-factory';

class RecognitionPageModel {
  //Recognition Engagement text field
  caseNoteTextField = $('[data-test=recognition-details-engagement-notes]');
  qualificationTypes = $('[datatest=recognition-details-qual-types]');
  otherQualification = $('[data-test=recognition-details-qual-types-other]');
  previuoslySubmittedApplication = $('[datatest=recognition-details-submitted-app]');
  saveButton = $('[data-test="save-button"]');

  followUpDate = $ ('[data-test="engagement-follow-up-date"]');

}

export default new RecognitionPageModel();
