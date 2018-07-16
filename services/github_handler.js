import rabbitmqService from "../services/rabbitmq_service";
import routingKeysConfig from "../routingKeysConfig";
import _ from "underscore";
import logger from "./logger";

export default function (req, res, next) {
    const payload = JSON.parse(req.body.payload);
    const repoName = payload.repository.name;
    logger.logEventOccurence(repoName);
    const routingKey = getRoutingKey(repoName);


    function getRoutingKey(repoName) {
        let routingKey = "default";
        Object.keys(routingKeysConfig).forEach(function (assignment) {
            if (repoName.startsWith(assignment)) {
                routingKey = routingKeysConfig[assignment];
            }
        });
        return routingKey;
    }

    function generateUniqueId() {
        const dateTimeString = new Date().toISOString();
        let commitId = payload.head_commit.id.substr(0, 7);
        return new Buffer(`${commitId}|${dateTimeString}`).toString("base64");
    }

    function createJsonPayload() {
        const repositoryKeys = ["id", "name", "full_name", "description", "archive_url", "git_url", "ssh_url", "clone_url"];
        return JSON.stringify({
            git: {
                commit: payload.head_commit,
                repository: _.pick(payload.repository, ...repositoryKeys)
            },
            uniqueId: generateUniqueId()
        });
    }

    function publishToRabbitMQ() {
        const jsonPayload = createJsonPayload();
        rabbitmqService.publish(routingKey, jsonPayload).then(function () {
            logger.logMessagePublished(JSON.parse(jsonPayload), routingKey);
            res.sendStatus(200);
        }).catch(function (error) {
            logger.logPublishError(JSON.parse(jsonPayload), error, routingKey);
            next(error);
        });
    }

    if(payload.head_commit) {
           publishToRabbitMQ()
    } else {
        logger.logInsufficientDataEvent(repoName);
        res.sendStatus(200);
    }
}