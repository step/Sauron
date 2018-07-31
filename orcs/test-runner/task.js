const shell = require("shelljs");
const fs = require("fs");
shell.config.silent = true;
const TESTS_PATH = "./test-project/test";

export default function(data) {
    return new Promise(function(resolve, reject) {
        function copyTests(testsPath, codePath) {
            shell.exec(`cp -R ${testsPath} ${codePath}`);
        }

        function runTests(directory) {
          shell.exec("mocha --reporter mocha_reporter", {cwd: directory});
          const resultFile = fs.readFileSync(`${directory}/__report.json`, "utf-8");
          return JSON.parse(resultFile);
        }

        try {
            copyTests(TESTS_PATH, data.directory);
            const report = runTests(data.directory);
            resolve(report);
        } catch(e) {
            reject(e);
        }
    });
}
