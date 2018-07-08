const shell = require("shelljs");

export default function(data) {
    return new Promise(function(resolve, reject) {
        resolve(data);
    });
}