const shell = require("shelljs");
shell.config.silent = true;

export default function(data) {
    return new Promise(function(resolve, reject) {
        try {
            shell.cp("-R", "test-project/test", data.directory);
            shell.exec("mocha", {cwd: data.directory});
        } catch(e) {
            reject(e);
        }
    });
}
