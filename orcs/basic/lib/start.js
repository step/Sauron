import {rabbitMQ as config} from "../config.json";
import task from "../index.js";
import logger from "./logger";
import rabbitMQListener from "./rabbitMQ_listener";
import {downloadRepository, deleteRepoDirectory} from "./repository_handler";
import sendReports from "./reports_adaptor";

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
        directory: `./repo/${data.commit.id}`
    });
}

function onMessageReceived(message) {
    parseMessage(message)
        .then(performTask, logger.logParsingError);
}

function onTaskCompleted(data, reports) {
    logger.logTaskCompleted(data.uniqueId);
    deleteRepoDirectory(data);
    sendReports(data, reports);
}

function onTaskError(data, e) {
    deleteRepoDirectory(data);
    logger.logTaskFailed(data.uniqueId, e);
}

function performTask(data) {
    logger.logMessageReceived(data);
    downloadRepository(data);
    logger.logTaskStarted(data.uniqueId);
    task(data)
        .then(onTaskCompleted.bind(null, data), onTaskError.bind(null, data));
}

rabbitMQListener(config, onMessageReceived);