import logger from "./logger";

const request = require("request");
import {souron, agent} from "../config";

export default function (data, reports) {

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

    function generateURL() {
        return `${souron.url}/${souron.reportsPath}`;
    }

    function generateReport() {
        return Object.assign(data, {
            reports: Object.assign(reports, { generatedAt: new Date().toString() }),
            orc: agent
        });
    }

    function postReports() {
        request.post({
            url: generateURL(),
            json: generateReport()
        }).on('error', handleError).on('response', handleResponse);
    }

    logger.logSendingReports(data.uniqueId);
    postReports();
}