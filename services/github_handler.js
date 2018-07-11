import rabbitmqService from "../services/rabbitmq_service";
import {routingKeys as config} from "../config.json";
import _ from "underscore";

export default function (req, res, next) {
    const payload = JSON.parse(req.body.payload);
    const repoName = payload.repository.name;
    const routingKey = config[repoName];

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

    console.log(JSON.parse(createJsonPayload()));

    rabbitmqService.publish(routingKey, createJsonPayload()).then(function () {
        res.send(200);
    }).catch(function (error) {
        next(error);
    });
}