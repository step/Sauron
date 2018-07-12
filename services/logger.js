function timestamp() {
    return new Date().toString();
}

function logInsufficientDataEvent(repoName) {
    console.warn(`[*] [${timestamp()}] Event came from repo '${repoName}' without the commit details. It may be first event from repo. Push something to repo.`);
}

function logMessagePublished(data, routingKey) {
    console.log(`[${data.uniqueId}] [${timestamp()}] Published to RabbitMQ, repo:${data.git.repository.name}, commit:${data.git.commit.id}, routingKey:${routingKey}`);
}

function logPublishError(data, error, routingKey) {
    console.error(`[${data.uniqueId}] [${timestamp()}] Error publishing to RabbitMQ, repo:${data.git.repository.name}, commit:${data.git.commit.id}, routingKey:${routingKey}`);
    console.error("\t", error);
}

function logSavingReports(data) {
    console.log(`[${data.uniqueId}] [${timestamp()}] Triggered saving reports`);
}

function logSavedReports(data) {
    console.log(`[${data.uniqueId}] [${timestamp()}] Saved reports successfully`);
}

function logErrorSavingReports(data, error) {
    console.error(`[${data.uniqueId}] [${timestamp()}] Error saving reports to DB`);
    console.error("\t", error);
}

function logEventOccurence(repoName) {
    console.log(`[*] [${timestamp()}] Event came from repo:${repoName}.`)
}

export default {
    logInsufficientDataEvent,
    logMessagePublished,
    logPublishError,
    logSavingReports,
    logSavedReports,
    logErrorSavingReports,
    logEventOccurence
}