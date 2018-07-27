const shell = require("shelljs");
const fs = require('fs');
shell.config.silent = true;

export default function(data) {
    return new Promise(function(resolve, reject) {
        function runTests(directory) {
          shell.cp("-R", "test-project/test", directory);
          shell.exec("mocha --reporter mocha_reporter", {cwd: directory});
          let resultFile=fs.readFileSync(`${directory}/__report.json`, 'utf-8');
          return JSON.parse(resultFile);
        }

        try {
            const report = runTests(data.directory);
            resolve(report);
        } catch(e) {
            reject(e);
        }
    });
}
