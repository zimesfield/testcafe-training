const reporter = require('cucumber-html-reporter');
const fs = require('fs');

const getMetadata = () => {
    const rawData = fs.readFileSync('cucumber/reports/metadata.json', 'utf-8');
    return JSON.parse(rawData);
};

const options = {
    jsonFile: 'cucumber/reports/cucumber_report.json',
    launchReport: false,
    metadata: getMetadata(),
    output: 'cucumber/reports/cucumber_report.html',
    reportSuiteAsScenarios: true,
    theme: 'bootstrap'
};

reporter.generate(options);

// more info on `metadata` is available in `options` section below.

// to generate consolidated report from multi-cucumber JSON files, please use `jsonDir` option instead of `jsonFile`.
// More info: https://www.npmjs.com/package/cucumber-html-reporter
