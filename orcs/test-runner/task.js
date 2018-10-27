const shell = require('shelljs');
const fs = require('fs');
shell.config.silent = true;
const TESTS_ROOT = process.env.TESTS_ROOT || './test-project';
const TIMEOUT_SEC = 10;

export default function(data, config) {
  return new Promise(function(resolve, reject) {
    function copyTests(testsPath, codePath) {
      shell.exec(`cp -R ${testsPath}/* ${codePath}`);
    }

    function runTests(directory) {
      // gtimeout for mac
      shell.exec(
        `timeout ${TIMEOUT_SEC} mocha --reporter mocha_reporter __test`,
        { cwd: directory }
      );

      let logFile = fs.readFileSync(`${directory}/test.log`, 'utf-8');
      let reportPath = `${directory}/__report.json`;
      let testReportFile = '{}';

      if (fs.existsSync(reportPath))
        testReportFile = fs.readFileSync(reportPath, 'utf-8');

      let result = {
        log: logFile,
        testResult: JSON.parse(testReportFile)
      };

      return result;
    }

    try {
      let { project } = data;
      let testsPath = [TESTS_ROOT, project.repo_keyword].join('/');
      copyTests(testsPath, data.directory);
      const report = runTests(data.directory);
      resolve(report);
    } catch (e) {
      reject(e);
    }
  });
}
