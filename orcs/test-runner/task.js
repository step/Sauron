const shell = require("shelljs");
const fs = require("fs");
shell.config.silent = true;
const TESTS_ROOT = process.env.TESTS_ROOT || "./test-project";

export default function(data,config) {
    return new Promise(function(resolve, reject) {
        function copyTests(testsPath, codePath) {
            shell.exec(`cp -R ${testsPath}/* ${codePath}`);
        }

        function runTests(directory) {
          shell.exec("mocha --reporter mocha_reporter __test", {cwd: directory});
          const resultFile = fs.readFileSync(`${directory}/__report.json`, "utf-8");
          // copy log file as well
          return JSON.parse(resultFile);
        }

        try {
            let {project} = data;
            let testsPath = [TESTS_ROOT,project.repo_keyword].join("/");
            copyTests(testsPath, data.directory);
            const report = runTests(data.directory);
            resolve(report);
        } catch(e) {
            reject(e);
        }
    });
}
