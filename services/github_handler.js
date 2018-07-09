import rabbitmqService from "../services/rabbitmq_service";
import {routingKeys as config} from "../config.json";

export default function(req, res, next) {
    const payload = JSON.parse(req.body.payload);
    const repoName = payload.repository.name;
    const routingKey = config[repoName];

    function generateUniqueId() {
        const dateTimeString = new Date().toISOString();
        let commitId = payload.head_commit.id.substr(0, 7);
        return new Buffer(`${commitId}|${dateTimeString}`).toString("base64");
    }

    function createJsonPayload() {
        return JSON.stringify({
            commit: payload.head_commit,
            repository: payload.repository,
            uniqueId: generateUniqueId()
        });
    }

    rabbitmqService.publish(routingKey, createJsonPayload()).then(function() {
        res.send(200);
    }).catch(function(error) {
        next(error);
    });
}