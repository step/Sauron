import {rabbitMQ as config} from "../config.json";
import task from "../index.js";
import logger from "./logger";
import rabbitMQListener from "./rabbitMQ_listener";
import {downloadRepository, deleteRepoDirectory} from "./repository_handler";

function parseMessage(message) {
    return new Promise(function (resolve, reject) {
        try {
            let data = JSON.parse(message);
            resolve(addUniqueLogId(data));
        } catch (e) {
            reject(e);
        }
    });
}

function addUniqueLogId(data) {
    return Object.assign(data, {uniqueLogId: data.commit.id.substr(0,7)});
}


function sendReports(data, reports) {
    logger.logSendingReports(data.uniqueLogId);
    logger.logReportsSent(data.uniqueLogId);
}

function onMessageReceived(message) {
    parseMessage(message)
        .then(performTask)
        .catch(logger.logParsingError);
}

function onTaskCompleted(data, reports) {
    logger.logTaskCompleted(data.uniqueLogId);
    deleteRepoDirectory(data);
    sendReports(data, reports);
}

function onTaskError(data, e) {
    deleteRepoDirectory(data);
    logger.logTaskFailed(data.uniqueLogId, e);
}

function performTask(data) {
    logger.logMessageReceived(data);
    downloadRepository(data);
    logger.logTaskStarted(data.uniqueLogId);
    task(data)
        .then(onTaskCompleted.bind(null, data))
        .catch(onTaskError.bind(null, data));
}

rabbitMQListener(config, onMessageReceived);