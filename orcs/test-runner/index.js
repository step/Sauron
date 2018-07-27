const shell = require("shelljs");
shell.config.silent = true;

import task from "./task";
import config from "./config";
const orcRunner = require("orc-runner");

shell.exec("sh ./mocha-json-reporter/cleanPackInstall.sh")
orcRunner.start(config, task);
