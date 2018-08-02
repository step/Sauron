const shell = require("shelljs");
shell.config.silent = true;

import task from "./task";
import config from "./config";
const orcRunner = require("orc-runner");

console.log("Installing mocha & mocha json reporter globally");
shell.exec("npm install -g mocha", function(){
  console.log("Installed mocha");
});
shell.exec("npm install -g git+https://github.com/sayalija/mocha-json-reporter.git", function(){
  console.log("Installed mocha json reporter");
});

orcRunner.start(config, task);
