import rabbitmqService from "../services/rabbitmq_service";
import projects from "../projects_config.json";
import _ from "underscore";
import logger from "./logger";
import crypto from "crypto";
const SECRET = process.env.SECRET || "THIS_IS_SECRET";

export default function (req, res, next) {
    const payload = req.body;
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

    function handleRequest(payload, repoName) {
        if(payload.head_commit) {
            publishToRabbitMQ(getProjectDetails(repoName))
        } else {
            logger.logInsufficientDataEvent(repoName);
            res.sendStatus(200);
        }
    }

    function verifySignature(signature, secret, data) {
        const computedSignature = 'sha1=' + crypto.createHmac('sha1', secret).update(data).digest('hex');
        console.log(secret);
        console.log(signature);
        console.log(computedSignature);
        return crypto.timingSafeEqual(new Buffer(signature), new Buffer(computedSignature));
    }

    if(verifySignature(req.get("X-Hub-Signature"), SECRET, JSON.stringify(payload))) {
        handleRequest(payload, repoName);
    } else {
        logger.logInvalidSignature(repoName);
        res.sendStatus(401);
    }
}
