# Orc Generator and Runner


## Steps to create an Orc:


 - ``` npm install orc-runner -g ```
 
 - ``` orc-generator <name-of-the-Orc> ```
 
 - The scaffold of the Orc will be generated in the directory as the same name given
 
 - Run `npm install`
 
 - Change the rabbitmq config and sauron reports URL in config.json or set the respective env variables
 
 - Write the task in the specified code block in `task.js` file
 
    ``` 
    const shell = require("shelljs");
    shell.config.silent = true;
     
    export default function(data) {
        return new Promise(function(resolve, reject) {
            //write your code here
        });
    }
    ```
 - Need any extra dependencies ? run `npm install <dependency> --save`
 
 - Do not change `index.js` file    


