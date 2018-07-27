var mocha = require('mocha');
var fs = require('fs');

module.exports = JSONToFile;

function writeToFile(fileName,failed,passed,pending) {
  let report={};
  report.total=failed.length+passed.length+pending.length;
  report.passed=passed;
  report.failed=failed;
  report.pending=pending;
  fs.writeFileSync(fileName,JSON.stringify(report));
}

function JSONToFile(runner,options) {
  let userOptions=options.reporterOptions;
  mocha.reporters.Base.call(this, runner);

  var currentSuite=[];
  var failed=[];
  var passed=[];
  var pending=[];

  runner.on('test',function(test){
  });

  runner.on('pass', function(test){
    let result={};
    result.suite=currentSuite.join("/");
    result.title=test.title;
    passed.push(result);
  });

  runner.on('suite',function(suite){
    currentSuite.push(suite.title);
    let fullSuite=currentSuite.join("/");
    let logFile=userOptions.logFile || "test.log";
    fs.appendFileSync(logFile,`running ${fullSuite}\n`);
  });

  runner.on('suite end',function(suite){
    currentSuite.pop();
  });

  runner.on('fail', function(test, err){
    let result={};
    result.suite=currentSuite.join("/");
    result.title=test.title;
    result.errMessage=test.err.message;
    result.actual=test.err.actual;
    result.expected=test.err.expected||"";
    failed.push(result);
  });

  runner.on('pending', function(test, err){
    let result={};
    result.suite=currentSuite.join("/");
    result.title=test.title;
    pending.push(result);
  });

  runner.on('end', function(){
    let fileName=userOptions.fileName || "__report.json";
    writeToFile(fileName,failed,passed,pending);
    process.exit(0);
  });
}
