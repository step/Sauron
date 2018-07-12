import config from "../config";
import task from "../index.js";
import logger from "./logger";
import rabbitMQListener from "./rabbitMQ_listener";
import {downloadRepository, deleteRepoDirectory} from "./repository_handler";
import sendReports from "./reports_adaptor";
import {generateSuccessReports, generateFailedReports} from "./reports_handler";

function parseMessage(message) {
    return new Promise(function (resolve, reject) {
        try {
            let data = JSON.parse(message);
            resolve(addExtraData(data));
        } catch (e) {
            reject(e);
        }
    });
}

function addExtraData(data) {
    return Object.assign(data, {
        directory: `./repo/${data.uniqueId}`
    });
}

function onMessageReceived(message) {
    parseMessage(message)
        .then(performTask, logger.logParsingError);
}

function onTaskCompleted(data, reports) {
    logger.logTaskCompleted(data.uniqueId);
    deleteRepoDirectory(data);
    sendReports(config.sauron, data, generateSuccessReports(config.agent, data, reports));
}

function onTaskError(data, e) {
    deleteRepoDirectory(data);
    logger.logTaskFailed(data.uniqueId, e);
    sendReports(config.sauron, data, generateFailedReports(config.agent, data, e))
}

function performTask(data) {
    logger.logMessageReceived(data);
    downloadRepository(data);
    logger.logTaskStarted(data.uniqueId);
    task(data)
        .then(onTaskCompleted.bind(null, data), onTaskError.bind(null, data));
}

rabbitMQListener(config.rabbitMQ, onMessageReceived);