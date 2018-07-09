function timestamp() {
    return new Date().toString();
}

function logParsingError(e) {
    console.error(`[${timestamp()}] Error: Error while parsing message from RabbitMQ\n`);
    console.error("\t", e);
}

function logMessageReceived(data) {
    console.log(`[${data.uniqueLogId}] [${timestamp()}] Received repo :${data.repository.name}, Commit: ${data.commit.id}`);
}

function logSendingReports(uniqueId) {
    console.log(`\t [${uniqueId}] [${timestamp()}] Sending reports back`);
}

function logReportsSent(uniqueId) {
    console.log(`\t [${uniqueId}] [${timestamp()}] Reports sent`)
}

function logTaskCompleted(uniqueId) {
    console.log(`\t [${uniqueId}] [${timestamp()}] Task execution completed`);
}

function logTaskFailed(uniqueId, e) {
    console.error(`\t [${uniqueId}] [${timestamp()}] Error: Error while executing the task\n`);
    console.error("\t\t", e);
}

function logWaitingMessage(routingKey) {
    console.log(`[${timestamp()}] Waiting for ${routingKey} events. To exit press CTRL+C`);
}

function logDownloadingRepo(uniqueId, link, directory) {
    console.log(`\t [${uniqueId}] [${timestamp()}] Downloading repository from ${link} to ${directory}`)
}

function logDeletingRepoDirectory(uniqueId, directory) {
    console.log(`\t [${uniqueId}] [${timestamp()}] Deleting repository directory ${directory}`)
}

function logTaskStarted(uniqueId) {
    console.log(`\t [${uniqueId}] [${timestamp()}] Starting to execute task`)
}

function logSendingReportsFailed(uniqueId, e) {
    console.error(`\t [${uniqueId}] [${timestamp()}] Error: Error while sending reports back`)
    console.error("\t\t", e);
}

export default {
    logParsingError,
    logMessageReceived,
    logSendingReports,
    logReportsSent,
    logTaskCompleted,
    logTaskFailed,
    logWaitingMessage,
    logDeletingRepoDirectory,
    logDownloadingRepo,
    logTaskStarted,
    logSendingReportsFailed
}