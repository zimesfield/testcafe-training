const cucumberJunitConvert = require('cucumber-junit-convert');

const options = {
    inputJsonFile: 'cucumber/reports/cucumber_report.json',
    outputXmlFile: 'cucumber/reports/cucumber_report.xml'
};

cucumberJunitConvert.convert(options);
