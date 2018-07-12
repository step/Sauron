import rabbitmqService from "../services/rabbitmq_service";
import config from "../config";
import _ from "underscore";

export default function (req, res, next) {
    const payload = JSON.parse(req.body.payload);
    const repoName = payload.repository.name;
    const routingKey = getRoutingKey(repoName);


    function getRoutingKey(repoName) {
        let routingKey = "default";
        Object.keys(config.routingKeys).forEach(function (assignment) {
            if (repoName.startsWith(assignment)) {
                routingKey = config.routingKeys[assignment];
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

    rabbitmqService.publish(routingKey, createJsonPayload()).then(function () {
        res.send(200);
    }).catch(function (error) {
        next(error);
    });
}