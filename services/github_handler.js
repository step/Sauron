import rabbitmqService from "../services/rabbitmq_service";
import projects from "../projects_config.json";
import _ from "underscore";
import logger from "./logger";

export default function (req, res, next) {
    const payload = JSON.parse(req.body.payload);
    const repoName = payload.repository.name;
    logger.logEventOccurence(repoName);


    function getProjectDetails(repoName) {
        let project = { name: "default", routing_key: "default" };
        projects.forEach(function(pro) {
            if(repoName.startsWith(pro.repo_keyword)) {
                project = pro;
            }
        });
        return project;
    }

    function generateUniqueId() {
        const dateTimeString = new Date().toISOString();
        let commitId = payload.head_commit.id.substr(0, 7);
        return new Buffer(`${commitId}|${dateTimeString}`).toString("base64");
    }

    function createJsonPayload(project) {
        return JSON.stringify({
            id: generateUniqueId(),
            flow: {
              start_time: new Date().toISOString()
            },
            commit: _.pick(payload.head_commit, "id", "url", "timestamp"),
            repository: _.pick(payload.repository, "id", "name", "full_name", "archive_url"),
            author: payload.head_commit.author,
            project: project
        });
    }

    function publishToRabbitMQ(project) {
        const jsonPayload = createJsonPayload(project);
        rabbitmqService.publish(project.routing_key, jsonPayload).then(function () {
            logger.logMessagePublished(JSON.parse(jsonPayload), project.routing_key);
            res.sendStatus(200);
        }).catch(function (error) {
            logger.logPublishError(JSON.parse(jsonPayload), error, project.routing_key);
            next(error);
        });
    }

    if(payload.head_commit) {
           publishToRabbitMQ(getProjectDetails(repoName))
    } else {
        logger.logInsufficientDataEvent(repoName);
        res.sendStatus(200);
    }
}
