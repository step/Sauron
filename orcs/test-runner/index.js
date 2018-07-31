const shell = require("shelljs");
shell.config.silent = true;

import task from "./task";
import config from "./config";
const orcRunner = require("orc-runner");

console.log("Installing mocha json reporter");
shell.exec("npm install mocha -g");
shell.exec("sh ./cleanPackInstall.sh", {cwd: "./mocha-json-reporter"});
console.log("Installation of mocha json reporter is done");

orcRunner.start(config, task);