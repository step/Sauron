import rabbitmqService from "../services/rabbitmq_service";
import {routingKeys as config} from "../config.json";

export default function(req, res, next) {
    const payload = JSON.parse(req.body.payload);
    const repoName = payload.repository.name;
    const routingKey = config[repoName];

    function createJsonPayload() {
        return JSON.stringify({
            commit: payload.head_commit,
            repository: payload.repository
        });
    }

    rabbitmqService.publish(routingKey, createJsonPayload()).then(function() {
        res.send(200);
    }).catch(function(error) {
        next(error);
    });
}