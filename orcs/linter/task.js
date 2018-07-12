const shell = require("shelljs");
shell.config.silent = true;

const CLIEngine = require("eslint").CLIEngine;
import eslintOptions from "./eslint-options";
import _ from "underscore";

export default function(data) {
    return new Promise(function(resolve, reject) {
        function removeSource(results) {
            return results.map(function(result) {
                return _.omit(result, 'source');
            });
        }

        function lint(sourcePath) {
            const cli = new CLIEngine(eslintOptions);
            const eslintReport = cli.executeOnFiles(sourcePath);
            const results = removeSource(eslintReport.results);
            return Object.assign(eslintReport, {results: results});
        }

        try {
            const report = lint(data.directory);
            resolve(report);
        } catch(e) {
            reject(e);
        }
    });
}