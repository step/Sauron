import {rabbitMQ as config} from "../config.json";
import task from "../index.js";
import rabbitMQListener from "./rabbitMQ_listener";
import downloadRepository from "./download_repo";

function parseMessage(message) {
    return JSON.parse(message);
}

function logMessageReceived(data) {
    console.log("==>", data.repository.name, " - ", data.commit.id);
}

function sendReports() {

}

function performTask(message) {
    const data = parseMessage(message);
    logMessageReceived(data);
    downloadRepository(data);
    task(data, sendReports);
}

rabbitMQListener(config, performTask);