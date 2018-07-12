function addOrcInfo(data, agent) {
    return Object.assign(data, {
        orc: agent
    });
}

function currentDateTimeString() {
    return new Date().toString();
}


export function generateSuccessReports(agent, data, taskResults) {
    const dataWithOrcInfo = addOrcInfo(data, agent);
    return Object.assign(dataWithOrcInfo, {
        status: "SUCCESSES",
        resultsGeneratedAt: currentDateTimeString(),
        results: taskResults,
    });
}

export function generateFailedReports(agent, data, error) {
    const dataWithOrcInfo = addOrcInfo(data);
    return Object.assign(dataWithOrcInfo, {
        status: "FAILED",
        failedAt: currentDateTimeString(),
        error: error
    });
}
