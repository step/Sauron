import {agent} from "../config";

function addOrcInfo(data) {
    return Object.assign(data, {
        orc: agent
    });
}

function currentDateTimeString() {
    return new Date().toString();
}


export function generateSuccessReports(data, taskResults) {
    const dataWithOrcInfo = addOrcInfo(data);
    return Object.assign(dataWithOrcInfo, {
        status: "SUCCESSES",
        resultsGeneratedAt: currentDateTimeString(),
        results: taskResults,
    });
}

export function generateFailedReports(data, error) {
    const dataWithOrcInfo = addOrcInfo(data);
    return Object.assign(dataWithOrcInfo, {
        status: "FAILED",
        failedAt: currentDateTimeString(),
        error: error
    });
}
