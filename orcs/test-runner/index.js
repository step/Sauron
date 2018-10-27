import config from './config';
import task from './task';
const orcRunner = require('orc-runner');
const shell = require('shelljs');
shell.config.silent = !config.debug;

orcRunner.start(config, task);
