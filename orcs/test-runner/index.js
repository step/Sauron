const shell = require("shelljs");
shell.config.silent = true;

import task from "./task";
import config from "./config";
const orcRunner = require("orc-runner");

orcRunner.start(config, task);
