// if you develop locally you can influence the executed tests as follows:
// `process.env.TAGS = ' @some-tag'`
// IMPORTANT: never forget to delete it again, otherwise only those tests will run in CI/CD environment!

// common options also apply to live-mode
const common = [
  "cucumber/features",
  "--require-module ts-node/register",
  "--require cucumber/**/*.ts",
];

if (process.env.LIVE_MODE !== "on") {
  common.push("--format json:./cucumber/reports/cucumber_report.json");
  common.push('--format @serenity-js/cucumber');
  common.push(
    typeof process.env.SCENARIO_RETRY === "undefined"
      ? "--retry 2"
      : "--retry " + process.env.SCENARIO_RETRY
  );
}

/**
 * A comma separated strings of tags that can be used to limit which feature files to run
 * @example @some-tag1, @some-tag2
 */
const tags = (process.env.TAGS || "")
  .split(",")
  .map((item) => item.trim())
  .join(" ");

if (!!tags.trim()) {
  common.push(`-t ${tags}"`);
}

module.exports = {
  cucumber: common.join(" "),
};
