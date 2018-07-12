const shell = require("shelljs");
shell.config.silent = true;

export default function(data) {
    return new Promise(function(resolve, reject) {
        const noOfFiles = shell.ls("-R", data.directory).length;
        resolve({noOfFiles: noOfFiles});
    });
}