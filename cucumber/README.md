## Commands

`npm run cucumber`: point to TypeScript Conig of the cucumber project and run cucumber
"cucumber": "TS_NODE_PROJECT=cucumber/tsconfig.json npx cucumber-js -p cucumber --tags 'not @skip'"

`npm run cucumber:wip`: run cucumber with scenarios that were tagged with "@wip" only
"cucumber:wip": "TAGS=@wip npm run tests",


`cucumber:publish`: run cucumber and publish report to "reports.cucumber" (will be deleted after 24h)
"cucumber:publish": "npm run tests -- --publish",

`cucumber:parallel`: run cucumber test in 2 browsers in parallel, then generate reports
"cucumber:parallel": "npm run tests -- --parallel 2 ; node ./cucumber/cucumber-html.config && node ./cucumber/cucumber-junit.config && rm -rf ./cucumber/reports/metadata.json",

"######## LIVE MODE ########": "",
Keep TestCafe instance alive and trigger cucumber test run when file changes (see nodemon.json)

"cucumber:live": "LIVE_MODE=on nodemon --config nodemon.json",
"cucumber:live:wip": "TAGS=@wip npm run cucumber:live",


"######## LINTING & FORMATING ########": "",
Linting: use eslint to perform static code analysis and fix code smells specified in eslintrc.js

Formatting: use prettier to format the code according to `.prettierrc`
Style: Combine linting + Formatting

"lint": "npx eslint cucumber/ --fix",
"format": "npx prettier 'cucumber/**/*.{ts,json,scss,html}' --write",
"style": "npm run format && npm run lint"

Uninstalled:
    "eslint": "~7.18.0",
    "eslint-import-resolver-typescript": "~2.3.0",
    "eslint-plugin-import": "~2.22.1",
    "eslint-plugin-jsdoc": "~31.0.5",

        "@typescript-eslint/eslint-plugin": "~4.13.0",
    "@typescript-eslint/parser": "~4.13.0",