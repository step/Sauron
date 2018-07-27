function timestamp() {
    return new Date().toISOString();
}

function logInsufficientDataEvent(repoName) {
    console.warn(`[*] [${timestamp()}] Event came from repo '${repoName}' without the commit details. It may be first event from repo. Push something to repo.`);
}

function logMessagePublished(data, routingKey) {
    console.log(`[${data.id}] [${timestamp()}] Published to RabbitMQ, repo:${data.repository.name}, commit:${data.commit.id}, routing_key:${routingKey}`);
}

function logPublishError(data, error, routingKey) {
    console.error(`[${data.id}] [${timestamp()}] Error publishing to RabbitMQ, repo:${data.repository.name}, commit:${data.commit.id}, routing_key:${routingKey}`);
    console.error("\t", error);
}

function logSavingReports(data) {
    console.log(`[${data.id}] [${timestamp()}] Triggered saving reports`);
}

function logSavedReports(data) {
    console.log(`[${data.id}] [${timestamp()}] Saved reports successfully`);
}

function logErrorSavingReports(data, error) {
    console.error(`[${data.id}] [${timestamp()}] Error saving reports to DB`);
    console.error("\t", error);
}

function logEventOccurence(repoName) {
    console.log(`[*] [${timestamp()}] Event came from repo:${repoName}.`)
}

function logInvalidSignature(repoName) {
    console.error(`[*] [${timestamp()}] Unauthorised event from repo'${repoName}'`)
}

export default {
    logInsufficientDataEvent,
    logInvalidSignature,
    logMessagePublished,
    logPublishError,
    logSavingReports,
    logSavedReports,
    logErrorSavingReports,
    logEventOccurence
}