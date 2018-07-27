#! /bin/bash

rm *.tgz
npm pack
npm install -g ./mocha_reporter-*.tgz
