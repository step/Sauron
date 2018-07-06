import rabbitmqService from "../services/rabbitmq_service";
import {queueMap as config} from "../config.json";

export default function(req, res, next) {
    const payload = JSON.parse(req.body.payload);
    const repoName = payload.repository.name;
    const queue = config[repoName];
    rabbitmqService.publish(queue, repoName).then(function() {
        res.send(200);
    }).catch(function(error) {
        next(error);
    });

}