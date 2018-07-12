import logger from "./logger";
const request = require("request");

export default function (sauron, data, reports) {

    function handleResponse(response) {
        if (response.statusCode === 200) {
            logger.logReportsSent(data.uniqueId);
        } else {
            const error = new Error(`${response.statusCode} - ${response.statusMessage}`);
            logger.logSendingReportsFailed(data.uniqueId, error);
        }
    }

    function handleError(error) {
        logger.logSendingReportsFailed(data.uniqueId, error);
    }

    function postReports() {
        request.post({
            url: sauron.postReportsUrl,
            json: reports
        }).on('error', handleError).on('response', handleResponse);
    }

    logger.logSendingReports(data.uniqueId);
    postReports();
}