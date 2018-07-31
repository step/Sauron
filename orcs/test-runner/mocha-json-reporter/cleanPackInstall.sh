#! /bin/bash
set -e
rm *.tgz
npm pack
npm install -g ./mocha_reporter-*.tgz
